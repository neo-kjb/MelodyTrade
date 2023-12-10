import express from "express";
const router = express.Router()

router.get('/')
router.post('/add')
router.get('/:id')
router.put('/:id/edit')
router.delete('/:id')
export default router