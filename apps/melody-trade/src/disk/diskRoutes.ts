import express from "express";
import { createDisk, getDisks } from "./diskController";
import { validateDiskInputMiddleware } from "./middleware";
const router = express.Router()

router.get('/',getDisks)
router.post('/add',validateDiskInputMiddleware,createDisk)
router.get('/:id')
router.put('/:id/edit')
router.delete('/:id')
export default router