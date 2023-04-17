import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.render("users/personal/apitoken", {
        title: 'API token',
        usermode: true
    })
};