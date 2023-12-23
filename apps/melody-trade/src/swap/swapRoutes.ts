import express from "express";
import { createSwap } from "./swapController";
import { isAuth } from "../user/middleware";
import { validateSwapRequest } from "./middleware";
const router = express.Router()

router.post('/', isAuth, validateSwapRequest, createSwap)

export default router