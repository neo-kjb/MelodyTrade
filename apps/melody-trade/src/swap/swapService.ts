// swapService.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const swapDB = prisma.swap;

interface Swap {
  senderId: number;
  receiverId: number;
  sentItemId: number;
  receivedItemId: number;
  status: string;
}

export class SwapService {
  static async createSwap(data: Swap) {
    return await swapDB.create({
      data,
    });
  }

  static async deleteAllSwaps() {
    return await swapDB.deleteMany();
  }

  static async getPendingSwapsForUser(userId: number) {
    return await swapDB.findMany({
      where: {
        status: 'pending',
        OR: [{ sentItem: { userId } }, { receivedItem: { userId } }],
      },
      include: {
        sentItem: true,
        receivedItem: true,
      },
    });
  }

  static async getPendingSwapByItems(
    sentItemId: number,
    receivedItemId: number
  ) {
    const swap1 = await swapDB.findFirst({
      where: {
        sentItemId,
        receivedItemId,
        status: 'pending',
      },
    });

    if (swap1) {
      return swap1;
    }

    const swap2 = await swapDB.findFirst({
      where: {
        sentItemId: receivedItemId,
        receivedItemId: sentItemId,
        status: 'pending',
      },
    });

    return swap2;
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
  }

  static async getAcceptedSwapsForUser(userId: number) {
    return await swapDB.findMany({
      where: {
        status: 'accepted',
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: {
        sentItem: true,
        receivedItem: true,
      },
    });
  }

  static async deleteRelatedSwapRequests(
    receivedItemId: number,
    sentItemId: number
  ) {
    return await swapDB.deleteMany({
      where: {
        status: 'pending',
        OR: [{ receivedItemId }, { sentItemId }],
      },
    });
  }
}

export { swapDB };
