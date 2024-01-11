import { PrismaClient } from '@prisma/client';
import { swapDB } from '../swap/swapService';
const prisma = new PrismaClient();
const diskDB = prisma.item;

interface Disk {
  name: string;
  description: string;
  location: string;
  imageURL: string;
  userId: number;
}

export class DiskService {
  static async createDisk(data: Disk) {
    return await diskDB.create({ data });
  }

  static async getDiskById(id: number) {
    return await diskDB.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        user: true,
      },
    });
  }

  static async getAllDisks() {
    const acceptedSwaps = await swapDB.findMany({
      where: {
        status: 'accepted',
      },
      select: {
        sentItemId: true,
        receivedItemId: true,
      },
    });

    const excludedDiskIds = acceptedSwaps.flatMap((swap) => [
      swap.sentItemId,
      swap.receivedItemId,
    ]);

    return await diskDB.findMany({
      where: {
        id: { notIn: excludedDiskIds },
      },
      include: {
        user: true,
      },
    });
  }

  static async updateDisk(id: number, data: Partial<Disk>) {
    return await diskDB.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteDisk(id: number) {
    return await diskDB.delete({
      where: {
        id,
      },
    });
  }
  static async deleteAllDisks() {
    return await diskDB.deleteMany();
  }
  static async getDisksByUsername(username: string) {
    return await diskDB.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        user: true,
      },
    });
  }

  static async updateDiskOwner(diskId: number, newOwnerId: number) {
    return await diskDB.update({
      where: { id: diskId },
      data: { userId: newOwnerId },
    });
  }
}
