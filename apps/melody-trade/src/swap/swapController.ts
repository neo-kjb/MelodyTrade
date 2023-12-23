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