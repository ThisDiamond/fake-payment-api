import { Router } from "express";
import { getLogin, getRegister, postLogin, postRegister, Verify, logout } from "../controllers/auth"

const router = Router();

router.post('/login', postLogin);
router.post('/register', postRegister);

router.get("/login", getLogin);
router.get("/register", getRegister);
router.get('/logout', logout)

export default router;
