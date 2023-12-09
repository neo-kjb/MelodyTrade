import express from "express";
import { getUserDetails, login, signup } from "./userController";
import { loginCheckCredentials, validateLoginMiddleware, validateSignupMiddleware } from "./middleware";

const router = express.Router()

router.post('/login',validateLoginMiddleware,loginCheckCredentials,login);
  
router.post('/signup',validateSignupMiddleware,signup)

router.get('/:id',getUserDetails)

export default router