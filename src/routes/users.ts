import { Router } from "express";
import { personal, postSettings } from "../controllers/users";
import { isAuthentication } from "../middlewares/isAuth";
import { dashboard, send, transaction, apitoken, settings, create, postCreate, getGenerateapikey } from '../controllers/users'
const router = Router();

router.get("/users/personal", isAuthentication, personal)
router.get("/users/personal/dashboard", isAuthentication, dashboard)
router.get("/users/personal/send", isAuthentication, send)
router.get("/users/personal/transaction", isAuthentication, transaction)
router.get("/users/personal/transaction/:project", isAuthentication, transaction)
router.get("/users/personal/apitoken", isAuthentication, apitoken)
router.get("/users/personal/apitoken/:project", isAuthentication, apitoken)
router.get("/users/personal/settings", isAuthentication, settings)
router.post("/users/personal/settings", isAuthentication, postSettings)

router.get('/users/personal/create', isAuthentication, create)
router.post('/users/personal/create', isAuthentication, postCreate)
router.get('/users/personal/generateapitoken/', isAuthentication, getGenerateapikey)
router.get('/users/personal/generateapitoken/:id', isAuthentication, getGenerateapikey)
export default router;