import { Router } from "express"
import { send, payCheckout, postPayCheckout, success, failed } from "../controllers/pay"
import { isAuthentication } from "../middlewares/isAuth"
import { isAuthPay } from '../middlewares/isAuthPay'

const router = Router()

router.get('/pay-checkout', isAuthPay, payCheckout)
router.get('/pay-checkout/success', success)
router.get('/pay-checkout/failed', failed)

router.post('/send', isAuthentication, send)
router.post('/pay-checkout', isAuthPay, postPayCheckout)

export default router
