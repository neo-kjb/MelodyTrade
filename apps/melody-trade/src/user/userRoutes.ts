import express from "express";
import { getUserDetails, login, signup, getCurrUser } from "./userController";
import { isAuth, loginCheckCredentials, validateLoginMiddleware, validateSignupMiddleware } from "./middleware";

const router = express.Router()

router.post('/login', validateLoginMiddleware, loginCheckCredentials, login);

router.post('/signup', validateSignupMiddleware, signup)

router.get('/:nameIn', getUserDetails)

router.get("/auth", isAuth, getCurrUser)

export default router