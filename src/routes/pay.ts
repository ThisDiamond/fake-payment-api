import { Router } from "express"
<<<<<<< HEAD
import { send, payCheckout, postPayCheckout, success, failed } from "../controllers/pay"
import { isAuthentication } from "../middlewares/isAuth"
import { isAuthPay } from '../middlewares/isAuthPay'

const router = Router()

router.get('/pay-checkout', isAuthPay, payCheckout)
router.get('/pay-checkout/success', success)
router.get('/pay-checkout/failed', failed)

router.post('/send', isAuthentication, send)
router.post('/pay-checkout', isAuthPay, postPayCheckout)
=======
import { send } from "../controllers/pay"
import { isAuthentication } from "../middlewares/isAuth"

const router = Router()

router.post('/send', isAuthentication, send)
>>>>>>> b8b03c93058f585878211f88e5318afe233416af

export default router
