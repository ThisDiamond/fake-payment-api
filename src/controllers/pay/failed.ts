import { Request, Response, NextFunction } from "express"

export default async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('apiTokenCookie')
    res.clearCookie('amountCookie')
    res.render('users/pay/failed')
}