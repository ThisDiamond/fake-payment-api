import { Router } from "express";
import { personal } from "../controllers/users";
import { isAuthentication } from "../middlewares/isAuth";
import { dashboard, send, transaction, apitoken, settings, create, postCreate, getGenerateapikey } from '../controllers/users'
const router = Router();

router.get("/users/personal", isAuthentication, personal)
router.get("/users/personal/dashboard", isAuthentication, dashboard)
router.get("/users/personal/send", isAuthentication, send)
router.get("/users/personal/transaction", isAuthentication, transaction)
router.get("/users/personal/apitoken", isAuthentication, apitoken)
router.get("/users/personal/settings", isAuthentication, settings)

router.get('/users/personal/create', isAuthentication, create)
router.post('/users/personal/create', isAuthentication, postCreate)
router.get('/users/personal/generateapitoken', isAuthentication, getGenerateapikey)
export default router;