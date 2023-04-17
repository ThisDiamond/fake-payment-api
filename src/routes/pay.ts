import { Router } from "express"
import { send } from "../controllers/pay"
import { isAuthentication } from "../middlewares/isAuth"

const router = Router()

router.post('/send', isAuthentication, send)

export default router
