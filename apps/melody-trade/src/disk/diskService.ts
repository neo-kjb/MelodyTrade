import { PrismaClient } from "@prisma/client";
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
    return await diskDB.findMany({
      include: {
        user: true,
      },
    });
  }

  static async updateDisk(id: number, data: Partial<Disk>) {
    return await diskDB.update({
      where: {
        id
      },
      data,
    });
  }

  static async deleteDisk(id: number) {
    return await diskDB.delete({
      where: {
        id
      },
    });
  }
}
