import { PrismaClient } from "@prisma/client";
import { UserService } from "./userService";

const prisma = new PrismaClient();

describe('UserService', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.user.deleteMany();
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

  test('findById should find a user by ID', async () => {
    const existingUser = {
      username: 'existinguser',
      email: 'existing@example.com',
      password: 'existingpassword',
    };

    const createdUser = await prisma.user.create({ data: existingUser });

    const foundUser = await UserService.findById(createdUser.id);

    expect(foundUser).toBeDefined();
    expect(foundUser?.username).toBe(existingUser.username);
  });

  test('findOneByUsername should find a user by username', async () => {
    const existingUser = {
      username: 'existinguser',
      email: 'existing@example.com',
      password: 'existingpassword',
    };

    await prisma.user.create({ data: existingUser });

    const foundUser = await UserService.findOneByUsername(existingUser.username);

    expect(foundUser).toBeDefined();
    expect(foundUser?.email).toBe(existingUser.email);
  });

  test('deleteUser should delete a user by ID', async () => {
    const existingUser = {
      username: 'existinguser',
      email: 'existing@example.com',
      password: 'existingpassword',
    };

    const createdUser = await prisma.user.create({ data: existingUser });

    await UserService.deleteUser(createdUser.id);

    const userAfterDeletion = await prisma.user.findFirst({
      where: { id: createdUser.id },
    });

    expect(userAfterDeletion).toBeNull();
  });

  test('deleteAllUsers should delete all users', async () => {
    const userData1 = {
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
    };

    const userData2 = {
      username: 'user2',
      email: 'user2@example.com',
      password: 'password2',
    };

    await prisma.user.create({data:userData1})
    await prisma.user.create({data:userData2})

    await UserService.deleteAllUsers();

    const usersAfterDeletion = await prisma.user.findMany();

    expect(usersAfterDeletion).toHaveLength(0)
  });
});
