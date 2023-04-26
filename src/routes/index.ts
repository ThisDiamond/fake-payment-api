import { Request, Response, Router } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.render('index', {
        title: 'PayChain'
    })
});

export default router;
