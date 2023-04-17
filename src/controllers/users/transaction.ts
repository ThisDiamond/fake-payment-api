import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.render("users/personal/transaction", {
        title: 'Transaction',
        usermode: true
    })
};