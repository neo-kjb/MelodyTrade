import express from "express";
import { acceptSwap, createSwap, getPendingSwapsForUser, getSwapDetails } from "./swapController";
import { isAuth } from "../user/middleware";
import { validateSwapId, validateSwapRequest } from "./middleware";
const router = express.Router()

router.post('/', isAuth, validateSwapRequest, createSwap)
router.get('/', isAuth, getPendingSwapsForUser)
router.get('/:swapId', isAuth, validateSwapId('access'), getSwapDetails)
router.put('/:swapId/accept', isAuth, validateSwapId('accept'), acceptSwap)

export default router