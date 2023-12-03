import express from "express";
import { login, signup } from "./userController";
import { validateLoginMiddleware, validateSignupMiddleware } from "./middleware";

const router = express.Router()

router.post('/login',validateLoginMiddleware,login);
  
router.post('/signup',validateSignupMiddleware,signup)

  export default router