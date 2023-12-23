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
