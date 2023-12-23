// swapService.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const swapDB = prisma.swap

interface Swap {
    senderId: number,
    receiverId: number,
    sentItemId: number,
    receivedItemId: number,
    status: string
}

export class SwapService {
    static async createSwap(data: Swap) {
        const swap = await swapDB.create({
            data
        });
        return swap
    }

    static async deleteAllSwaps() {
        return await swapDB.deleteMany();
    }

    static async getPendingSwapsForUser(userId: number) {

        const pendingSwaps = await swapDB.findMany({
            where: {
                status: 'pending',
                OR: [
                    { senderId: userId },
                    { receiverId: userId },
                ],
            },
            include: {
                sentItem: true,
                receivedItem: true,
            },
        });

        return pendingSwaps;
    }

    static async getPendingSwapByItems(senderId: number, sentItemId: number, receivedItemId: number) {
        return await swapDB.findFirst({
            where: {
                senderId,
                sentItemId,
                receivedItemId,
                status: 'pending',
            },
        });
    }

}

