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
}
