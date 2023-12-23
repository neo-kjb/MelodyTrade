import express from "express";
import { createSwap, getPendingSwapsForUser, getSwapDetails } from "./swapController";
import { isAuth } from "../user/middleware";
import { validateSwapRequest } from "./middleware";
const router = express.Router()

router.post('/', isAuth, validateSwapRequest, createSwap)
router.get('/', isAuth, getPendingSwapsForUser)
router.get('/:swapId', isAuth, getSwapDetails)

export default router