import { Request, Response, NextFunction } from "express"

export default async (req: Request, res: Response, next: NextFunction) => {
    res.render('users/pay/success')
}