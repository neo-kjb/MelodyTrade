import express from "express";
import { createDisk, getDiskDetails, getDisks } from "./diskController";
import { validateDiskInputMiddleware } from "./middleware";
import { isAuth } from "../user/middleware";
const router = express.Router()

router.get('/',getDisks)
router.post('/add',isAuth,validateDiskInputMiddleware,createDisk)
router.get('/:id',getDiskDetails)
router.put('/:id/edit')
router.delete('/:id')
export default router