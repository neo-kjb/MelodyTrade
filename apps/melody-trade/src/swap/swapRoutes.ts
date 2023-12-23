import express from "express";
import { createSwap } from "./swapController";
import { isAuth } from "../user/middleware";
const router = express.Router()

router.post('/', isAuth, createSwap)

export default router