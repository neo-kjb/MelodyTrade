import express from "express";
import { login, signup } from "./userController";
import { validateSignupMiddleware } from "./middleware";

const router = express.Router()

router.post('/login',login);
  
router.post('/signup',validateSignupMiddleware,signup)

  export default router