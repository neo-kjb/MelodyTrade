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
        return await swapDB.create({
            data
        });
    }

    static async deleteAllSwaps() {
        return await swapDB.deleteMany();
    }

    static async getPendingSwapsForUser(userId: number) {
        return await swapDB.findMany({
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

    static async getSwapDetails(swapId: number) {
        return await swapDB.findFirst({
            where: { id: swapId },
            include: {
                sentItem: true,
                receivedItem: true,
                sender: true,
                receiver: true,
            },
        });
    }

    static async updateSwapStatus(swapId: number, status: string) {
        return await swapDB.update({
            where: { id: swapId },
            data: { status },
        });
    };

}

