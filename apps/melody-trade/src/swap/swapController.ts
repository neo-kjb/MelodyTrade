import { Request, Response } from "express"
import { SwapService } from "./swapService"
import { DiskService } from "../disk/diskService"

export const createSwap = async (req: Request, res: Response) => {
    try {
        const senderId = req.reqUserId
        const { sentItemId, receivedItemId } = req.body
        const receivedItem = await DiskService.getDiskById(receivedItemId)
        const sentItem = await DiskService.getDiskById(sentItemId)
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
        const data = {
            senderId,
            receiverId,
            sentItemId,
            receivedItemId,
            status: 'pending'
        }
        const swap = await SwapService.createSwap(data)
        return res.status(201).send({ message: 'Swap request sent successfully', swap });
    } catch (error) {
        console.log('Error creating swap request:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}