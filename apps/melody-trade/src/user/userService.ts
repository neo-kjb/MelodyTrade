import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
const UserDB=prisma.user

interface user{
  username:string
  email:string
  password:string
}



export class UserService {
    static async createUser(data: user) {
        return await UserDB.create({ data });
    }

    static async findOne(email: string) {
        return await UserDB.findFirst({
            where: {
                email: {
                    equals: email,
                },
            },
        });
    }
    static async findById(id:number) {
        return await UserDB.findFirst({
            where: {
                id: {
                    equals: id,
                },
            },
        });
    }
    static async findOneByUsername(username: string) {
        return await UserDB.findFirst({
          where: {
            username: {
              equals: username,
            },
          },
        });
    }
    static async deleteUser(userId: number) {
        return await UserDB.delete({
          where: { id: userId },
        });
      }
    static async deleteAllUsers() {
        return await UserDB.deleteMany();
      }
}