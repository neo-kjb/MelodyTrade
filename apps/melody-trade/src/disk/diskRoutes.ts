import express from 'express';
import {
  createDisk,
  deleteDisk,
  editDisk,
  getDiskDetails,
  getDisks,
  getDisksByUser,
} from './diskController';
import { validateDiskInputMiddleware } from './middleware';
import { isAuth } from '../user/middleware';
const router = express.Router();

router.get('/', getDisks);
router.get('/user/:username', getDisksByUser);
router.post('/add', isAuth, validateDiskInputMiddleware, createDisk);
router.get('/:id', getDiskDetails);
router.put('/:id/edit', isAuth, validateDiskInputMiddleware, editDisk);
router.delete('/:id', isAuth, deleteDisk);
export default router;
