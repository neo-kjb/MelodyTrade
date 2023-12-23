import { Request, Response } from "express"
import { SwapService } from "./swapService"

export const createSwap = async (req: Request, res: Response) => {
    try {
        const swap = await SwapService.createSwap(req.body)
        return res.status(201).send({ message: 'Swap request sent successfully', swap });
    } catch (error) {
        console.log('Error creating swap request:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}

export const getPendingSwapsForUser = async (req: Request, res: Response) => {
    try {
        const userId = req.reqUserId
        const pendingSwaps = await SwapService.getPendingSwapsForUser(userId);
        return res.status(200).send({ count: pendingSwaps.length, data: pendingSwaps });
    } catch (error) {
        console.log('Error getting pending swaps:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
};

export const getSwapDetails = async (req: Request, res: Response) => {
    try {
        const swapId = parseInt(req.params.swapId, 10);
        if (isNaN(swapId) || swapId <= 0) {
            return res.status(400).send({ message: 'Invalid swap ID' });
        }
        const swap = await SwapService.getSwapDetails(swapId);
        if (!swap) {
            return res.status(404).send({ message: 'Swap not found' });
        }

        const userId = req.reqUserId;
        if (swap.senderId !== userId && swap.receiverId !== userId) {
            return res.status(401).send({ message: 'Unauthorized access to swap details' });
        }
        res.status(200).send({ swap });
    } catch (error) {
        console.log('Error getting swap details:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
