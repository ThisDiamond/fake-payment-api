import { Router } from "express";
<<<<<<< HEAD
import { personal, postSettings } from "../controllers/users";
=======
import { personal } from "../controllers/users";
>>>>>>> b8b03c93058f585878211f88e5318afe233416af
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
<<<<<<< HEAD
router.post("/users/personal/settings", isAuthentication, postSettings)
=======
>>>>>>> b8b03c93058f585878211f88e5318afe233416af

router.get('/users/personal/create', isAuthentication, create)
router.post('/users/personal/create', isAuthentication, postCreate)
router.get('/users/personal/generateapitoken/', isAuthentication, getGenerateapikey)
router.get('/users/personal/generateapitoken/:id', isAuthentication, getGenerateapikey)
export default router;