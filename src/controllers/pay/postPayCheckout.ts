import { Request, Response, NextFunction } from "express"
import { getApiTokenbyApiTokenAdress } from "../../services/apiToken.service";
import { getWalletbyUserId, saveTransaction, transfer_sender_to_receipter } from "../../services/pay.service";
import { generateJWTToken } from "../../services/token.service";
import { findUserByEmail } from "../../services/users.service";
import { schemaLogin, schemaPayCheckout, LoginJoi, payCheckout } from "../../validation/user.validation";


export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.cookies.token
        const apiTokenC = req.cookies.apiTokenCookie
        const amountC = req.cookies.amountCookie

        if (token == undefined) {

            // Joi Validation login password
            const { error: loginError, value: loginValue } = schemaLogin.validate(req.body) as { error: Error | undefined, value: LoginJoi };

            // check error validation
            if (loginError) {
                req.flash('msgErrorPay', `${loginError.message}`)
                res.redirect(`/pay-checkout`)
                return
            }

            // find email
            const user = await findUserByEmail(loginValue.email)

            // check email
            if (user?.email != loginValue.email) {
                req.flash("msgErrorPay", `Email yoki parol xato!`)
                res.redirect("/pay-checkout")
                return
            }

            // check password
            if (user?.password != loginValue.password) {
                req.flash("msgErrorPay", `Email yoki parol xato!`)
                res.redirect("/pay-checkout")
                return
            }

            // email and password passed generate new jwt token
            const token = generateJWTToken(user.email);
            res.cookie("token", token);

            // save locals 
            res.locals.isAuth = true
            res.locals.user_name = (user.firstname + " " + user.lastname)

        }

        // Joi Validation cardNumber cardCode
        const { error: payCheckoutError, value: payCheckoutValue } = schemaPayCheckout.validate(req.body) as { error: Error | undefined, value: payCheckout };

        // check cardNumber cardCode validation
        if (payCheckoutError) {
            req.flash('msgErrorPay', `${payCheckoutError.message}`)
            res.redirect(`/pay-checkout`)
            return
        }

        // get project api token
        const receipter_api = await getApiTokenbyApiTokenAdress(apiTokenC)

        // check receipter_api 
        if (receipter_api == null) {
            res.redirect("/pay-checkout/failed")
            return
        }

        // get wallet receipter
        const receipter_wallet = await getWalletbyUserId(Number(receipter_api?.id_user))

        // check wallet receipter found
        if (receipter_wallet == null) {
            res.redirect("/pay-checkout/failed")
            return
        }

        // check res.locals id user
        if (!res.locals.id_user) {
            res.redirect("/pay-checkout/failed")
            return
        }

        // get wallet sender isAuth token
        const sender_wallet = await getWalletbyUserId(Number(res.locals.id_user))

        // check wallet sender found
        if (sender_wallet == null) {
            req.flash("msgErrorPay", `Bunday karta mavjud emas!`)
            res.redirect("/pay-checkout")
            return
        }

        // check sender wallet adress input card
        if (sender_wallet.address != BigInt(payCheckoutValue.cardNumber)) {
            req.flash("msgErrorPay", `Karta raqamingizni tekshirib ko'ring!`)
            res.redirect("/pay-checkout")
            return
        }

        // check wallet equal receipter and sender
        if (sender_wallet?.address == receipter_wallet?.address) {
            req.flash("msgErrorPay", `Karta raqamingizni tekshirib ko'ring!`)
            res.redirect("/pay-checkout")
            return
        }

        // check wallet code     
        if (sender_wallet.code != payCheckoutValue.cardCode) {
            req.flash("msgErrorPay", `Karta raqami kodi noto'g'ri!`)
            res.redirect("/pay-checkout")
            return
        }

        // transfer amount
        const transaction =
            await transfer_sender_to_receipter(
                Number(receipter_wallet.address),
                Number(amountC),
                Number(sender_wallet.address)
            )

        // check error transaction
        if (!transaction) {
            req.flash("msgErrorPay", `Server xatoligi qaytadan urunib ko'ring!`)
            res.redirect("/pay-checkout/failed")
            return
        }

        // save transaction
        if (transaction) {
            await saveTransaction(
                Number(amountC),
                Number(receipter_wallet.address),
                Number(sender_wallet.address),
                Number(receipter_api.id_project),
                Number(res.locals.id_user)
            )
            res.locals.isTransaction = true
        }

        // clear cookie
        res.clearCookie('apiTokenCookie')
        res.clearCookie('amountCookie')

        // redirect 
        res.redirect('/pay-checkout/success')
    } catch (error) {
        console.log(error);
    }
}