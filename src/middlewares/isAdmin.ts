import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // check user type
    const user_type = res.locals.user_type

    if (user_type == "admin") {
        next()
        return
    }
    if (user_type == "user") {
        res.redirect('/')
        return
    }

    next()
}