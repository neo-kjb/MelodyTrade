import { Request, Response, NextFunction } from 'express';
import { DiskService } from '../disk/diskService';
import { SwapService } from './swapService';

export const validateSwapRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const senderId = req.reqUserId
        const { sentItemId, receivedItemId } = req.body

        const existingSwap = await SwapService.getPendingSwapByItems(senderId, sentItemId, receivedItemId);
        if (existingSwap) {
            return res.status(400).send({ message: 'Duplicate swap request for the same items' });
        }

        const sentItem = await DiskService.getDiskById(sentItemId)
        const receivedItem = await DiskService.getDiskById(receivedItemId)

        if (!sentItem || !receivedItem) {
            return res.status(404).send({ message: 'Invalid item id' });
        }
        if (sentItemId === receivedItemId) {
            return res.status(400).send({ message: 'Sent and received item IDs cannot be the same' });
        }

        if (sentItem.userId !== senderId) {
            return res.status(401).send({ message: 'Not Authorized' })
        }

        const receiverId = receivedItem.userId

        if (senderId === receiverId) {
            return res.status(400).send({ message: 'Cannot swap between your own items' });
        }
        req.body = {
            senderId,
            receiverId,
            sentItemId,
            receivedItemId,
            status: 'pending'
        }

        next()
    } catch (error) {
        console.log('Error validating swap request:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}


export const validateSwapId = (action: 'bothUsers' | 'receiverOnly') => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const swapId = parseInt(req.params.swapId, 10)
        if (isNaN(swapId) || swapId <= 0) {
            return res.status(400).send({ message: 'Invalid swap ID' })
        }

        const swap = await SwapService.getSwapDetails(swapId)
        if (!swap) {
            return res.status(404).send({ message: 'Swap not found' })
        }

        const userId = req.reqUserId

        if (action === 'bothUsers') {
            if (swap.senderId !== userId && swap.receiverId !== userId) {
                return res.status(401).send({ message: 'Unauthorized access to swap details' })
            }
        } else if (action === 'receiverOnly') {
            if (swap.receiverId !== userId) {
                return res.status(401).send({ message: 'Unauthorized to accept the swap' })
            }
        }

        next()
    } catch (error) {
        console.log('Error validating swap ID:', error)
        return res.status(500).send({ message: 'Internal Server Error' })
    }
};
