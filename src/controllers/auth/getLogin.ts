import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies.token) {
<<<<<<< HEAD
        return res.redirect('/users/personal')
=======
        return res.redirect('/')
>>>>>>> b8b03c93058f585878211f88e5318afe233416af
    }
    res.render('login', {
        title: 'Login',
        msgFlash: req.flash('error')
    })
}
