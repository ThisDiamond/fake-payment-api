import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('token')
    res.redirect('/login')
}
