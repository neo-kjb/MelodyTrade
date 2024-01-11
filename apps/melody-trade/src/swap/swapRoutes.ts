import express from 'express';
import {
  acceptSwap,
  cancelSwap,
  createSwap,
  getPendingSwapsForUser,
  getSwapDetails,
  rejectSwap,
  getAcceptedSwaps,
} from './swapController';
import { isAuth } from '../user/middleware';
import { validateSwapId, validateSwapRequest } from './middleware';
const router = express.Router();

router.post('/', isAuth, validateSwapRequest, createSwap);
router.get('/', isAuth, getPendingSwapsForUser);
router.get('/accepted', isAuth, getAcceptedSwaps);

router.get('/:swapId', isAuth, validateSwapId('bothUsers'), getSwapDetails);
router.put(
  '/:swapId/accept',
  isAuth,
  validateSwapId('receiverOnly'),
  acceptSwap
);
router.put(
  '/:swapId/reject',
  isAuth,
  validateSwapId('receiverOnly'),
  rejectSwap
);
router.put('/:swapId/cancel', isAuth, validateSwapId('senderOnly'), cancelSwap);

export default router;
