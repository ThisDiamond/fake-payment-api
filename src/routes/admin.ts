import { Request, Response, Router } from "express";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuthentication } from '../middlewares/isAuth'

const router = Router();

router.get("/admin", isAuthentication, isAdmin, (req: Request, res: Response) => {
  res.render("admin/index");
});

export default router;