import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getWalletbyUserId } from "../services/pay.service";
import { findUserByEmail } from "../services/users.service";

export const isAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token

        if (token == undefined) {
            return res.redirect('/login')
        }

        if (token) {
            const decode = jwt.verify(token, String(process.env.JWT_SECRET)) as jwt.JwtPayload
            const user = await findUserByEmail(decode.username);

            if (user) {
                res.locals.id_user = String(user?.id)
                res.locals.user = String(user?.email);
                res.locals.user_type = String(user?.user_type);
                res.locals.user_name = String(user?.firstname + ' ' + user?.lastname)
            }

            const wallet = await getWalletbyUserId(+res.locals.id_user)
            res.locals.amount = wallet?.amount

            if (user == null) {
                return res.redirect('/logout')
            }
        }

        next()
    } catch (error) {
        console.log(error);
    }
}

