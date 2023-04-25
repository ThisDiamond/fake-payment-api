import { Request, Response, NextFunction } from "express"
import moment from "moment"
import { getApiTokenbyApiTokenAdress } from "../../services/apiToken.service"
import { getOneProjectbyId } from "../../services/project.service"

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const _apiToken = req.query.apiToken ?? req.cookies.apiTokenCookie
        const _amount = req.query.amount ?? req.cookies.amountCookie

        // check apitoken and amount
        if (!_apiToken || !_amount || String(_apiToken).length != 32) {
            return res.redirect("/pay-checkout/failed")
        }

        res.clearCookie('apiTokenCookie')
        res.clearCookie('amountCookie')

        res.cookie("apiTokenCookie", _apiToken)
        res.cookie("amountCookie", _amount)

        //  check apiToken 
        const apiToken = await getApiTokenbyApiTokenAdress(String(_apiToken))

        if (!apiToken) {
            res.redirect("/pay-checkout/failed")
            return
        }

        // check 
        const receipter = await getOneProjectbyId(Number(apiToken?.id_project))

        if (!receipter) {
            res.redirect("/pay-checkout/failed")
            return
        }

        const project_name = receipter?.name
        const isAuth = res.locals.isAuth ?? undefined

        res.render('users/pay/pay-checkout', {
            project_name,
            date: moment(new Date()).format('MM.DD.YYYY | HH:mm'),
            amount: _amount,
            user_name: res.locals.user_name,
            msgErrorPay: req.flash('msgErrorPay'),
            isAuth: isAuth,
        })

    } catch (error) {
        console.log(error);
    }
}