import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    res.render("users/personal/settings", {
        title: 'Settings',
<<<<<<< HEAD
        msgError: req.flash("msgError"),
        msgSuccess: req.flash("msgSuccess"),
=======
>>>>>>> b8b03c93058f585878211f88e5318afe233416af
        userName: res.locals.user_name,
        amount: res.locals.amount,
        usermode: true
    })
};