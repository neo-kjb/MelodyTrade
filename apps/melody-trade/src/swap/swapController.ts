import { Request, Response } from 'express';
import { SwapService } from './swapService';
import { DiskService } from '../disk/diskService';

export const createSwap = async (req: Request, res: Response) => {
  try {
    const swap = await SwapService.createSwap(req.body);
    return res
      .status(201)
      .send({ message: 'Swap request sent successfully', swap });
  } catch (error) {
    console.log('Error creating swap request:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const getPendingSwapsForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.reqUserId;
    const pendingSwaps = await SwapService.getPendingSwapsForUser(userId);
    return res
      .status(200)
      .send(
        pendingSwaps.length
          ? { count: pendingSwaps.length, data: pendingSwaps }
          : { message: "You don't have any swap request" }
      );
  } catch (error) {
    console.log('Error getting pending swaps:', error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const getSwapDetails = async (req: Request, res: Response) => {
  try {
    const swapId = parseInt(req.params.swapId, 10);
    const swap = await SwapService.getSwapDetails(swapId);
    res.status(200).send({ swap });
  } catch (error) {
    console.log('Error getting swap details:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const acceptSwap = async (req: Request, res: Response) => {
  try {
    const swapId = parseInt(req.params.swapId, 10);
    const updatedSwap = await SwapService.updateSwapStatus(swapId, 'accepted');
    if (updatedSwap.status === 'accepted') {
      await SwapService.deleteRelatedSwapRequests(updatedSwap.receivedItemId);

      await DiskService.updateDiskOwner(
        updatedSwap.receivedItemId,
        updatedSwap.senderId
      );
      await DiskService.updateDiskOwner(
        updatedSwap.sentItemId,
        updatedSwap.receiverId
      );
    }
    res
      .status(200)
      .send({ message: 'Swap request accepted successfully', updatedSwap });
  } catch (error) {
    console.log('Error accepting swap request:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
export const rejectSwap = async (req: Request, res: Response) => {
  try {
    const swapId = parseInt(req.params.swapId, 10);
    const updatedSwap = await SwapService.updateSwapStatus(swapId, 'rejected');
    res
      .status(200)
      .send({ message: 'Swap request rejected successfully', updatedSwap });
  } catch (error) {
    console.log('Error rejecting swap request:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const cancelSwap = async (req: Request, res: Response) => {
  try {
    const swapId = parseInt(req.params.swapId, 10);
    const updatedSwap = await SwapService.updateSwapStatus(swapId, 'canceled');
    res
      .status(200)
      .send({ message: 'Swap request canceled successfully', updatedSwap });
  } catch (error) {
    console.log('Error canceling swap request:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
export const getAcceptedSwaps = async (req: Request, res: Response) => {
  try {
    const userId = req.reqUserId;
    const acceptedSwaps = await SwapService.getAcceptedSwapsForUser(userId);
    res
      .status(200)
      .send(
        acceptedSwaps.length
          ? { count: acceptedSwaps.length, data: acceptedSwaps }
          : { message: "You don't have accepted swaps" }
      );
  } catch (error) {
    console.log('Error getting accepted swaps:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
