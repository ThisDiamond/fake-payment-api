import { Request, Response, Router } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.render('index', {
        title: 'PayChain'
    })
});

<<<<<<< HEAD
=======

>>>>>>> b8b03c93058f585878211f88e5318afe233416af
export default router;
