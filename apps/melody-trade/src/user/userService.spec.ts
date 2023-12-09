import { PrismaClient } from "@prisma/client";
import { UserService } from "./userService";

const prisma = new PrismaClient();

describe('UserService', () => {

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany()
  });

  test('createUser should create a new user', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    };

    await UserService.createUser(userData);

    const createdUser = await prisma.user.findFirst({
      where: {
        email: userData.email,
      },
    });

    expect(createdUser).toBeDefined();
    expect(createdUser?.username).toBe(userData.username);
  });

  test('findOne should find a user by email', async () => {
    const existingUser = {
      username: 'existinguser',
      email: 'existing@example.com',
      password: 'existingpassword',
    };

    await prisma.user.create({ data: existingUser });

    const foundUser = await UserService.findOne(existingUser.email);

    expect(foundUser).toBeDefined();
    expect(foundUser?.username).toBe(existingUser.username);
  });
});
