import { Request, Response, Router, NextFunction } from "express";
import { postLogin, postRegister, Verify } from "../controllers/auth"

const router = Router();

router.post('/login', postLogin);
router.post('/register', postRegister);

router.get("/login", (req: Request, res: Response, next: NextFunction) => {
    if (req.cookies.token) {
        return res.redirect('/')
    }
    res.render('login', {
        title: 'Login',
        msgFlash: req.flash('error')
    })

});

router.get("/register", (req: Request, res: Response) => {
    if (req.cookies.token) {
        return res.redirect('/')
    }
    res.render('register', {
        title: 'Register',
        msgFlash: req.flash('error')
    })
});

router.get('/logout', (req: Request, res: Response) => {
    res.clearCookie('token')
    res.redirect('/login')
})
export default router;
