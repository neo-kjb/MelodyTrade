import express from "express";
import { createSwap, getPendingSwapsForUser } from "./swapController";
import { isAuth } from "../user/middleware";
import { validateSwapRequest } from "./middleware";
const router = express.Router()

router.post('/', isAuth, validateSwapRequest, createSwap)
router.get('/', isAuth, getPendingSwapsForUser)

export default router