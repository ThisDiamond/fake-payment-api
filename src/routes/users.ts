import { Router } from "express";
import { personal } from "../controllers/users";
import { isAuthentication } from "../middlewares/isAuth";
import { dashboard, send, transaction, apitoken, settings } from '../controllers/users'
const router = Router();

router.get("/users/personal", isAuthentication, personal)
router.get("/users/personal/dashboard", isAuthentication, dashboard)
router.get("/users/personal/send", isAuthentication, send)
router.get("/users/personal/transaction", isAuthentication, transaction)
router.get("/users/personal/apitoken", isAuthentication, apitoken)
router.get("/users/personal/settings", isAuthentication, settings)

export default router;