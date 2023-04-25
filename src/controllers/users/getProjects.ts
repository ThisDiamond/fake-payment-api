import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.render("users/personal/getProject", {
        title: 'Create',
        userName: res.locals.user_name,
        amount: res.locals.amount,
        usermode: true
    })
};