import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies.token) {
        return res.redirect('/')
    }
    res.render('login', {
        title: 'Login',
        msgFlash: req.flash('error')
    })
}
