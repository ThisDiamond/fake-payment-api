import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.render("users/personal/dashboard", {
        title: 'Projects',
        usermode: true
    })
};