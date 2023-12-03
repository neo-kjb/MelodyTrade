import { PrismaClient,Prisma } from "@prisma/client";
const prisma = new PrismaClient()
const UserDB=prisma.user

interface user{
  username:string
  email:string
  password:string
}



export class UserService {
    static async createUser(data: user) {
        await UserDB.create({ data });
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
}