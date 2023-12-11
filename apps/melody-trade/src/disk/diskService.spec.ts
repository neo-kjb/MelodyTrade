import { PrismaClient } from "@prisma/client";
import { DiskService } from "./diskService";
import { UserService } from "../user/userService";

const prisma = new PrismaClient();
const disksDB = prisma.item

describe('DiskService', () => {
    let userId:number
  afterAll(async () => {
    await UserService.deleteAllUsers()
    await prisma.$disconnect();
  });
  beforeAll(async()=>{
    const user= await UserService.createUser({username:'username',email:'username@email.com',password:'password'})
    userId=user.id
  })

  beforeEach(async () => {
    await disksDB.deleteMany();
  });

  test('createDisk should create a new disk', async () => {
    const diskData = {
      name: 'Test Disk',
      description: 'Test Description',
      location: 'Test Location',
      imageURL: 'https://testurl.com',
      userId
    };

    await DiskService.createDisk(diskData);

    const createdDisk = await disksDB.findFirst({
      where: {
        name: diskData.name,
      },
    });

    expect(createdDisk).toBeDefined();
    expect(createdDisk?.description).toBe(diskData.description);
  });

  test('getDiskById should find a disk by ID', async () => {
    const existingDisk = {
      name: 'existingDisk',
      description: 'Existing Description',
      location: 'Existing Location',
      imageURL: 'https://existingurl.com',
      userId
    };

    const createdDisk = await disksDB.create({ data: existingDisk });

    const foundDisk = await DiskService.getDiskById(createdDisk.id);

    expect(foundDisk).toBeDefined();
    expect(foundDisk?.name).toBe(existingDisk.name);
  });

  test('getAllDisks should get all disks', async () => {
    const diskData = {
      name: 'Test Disk',
      description: 'Test Description',
      location: 'Test Location',
      imageURL: 'https://testurl.com',
      userId
    };
    await DiskService.createDisk(diskData);

    const response = await DiskService.getAllDisks();

    expect(response).toHaveLength(1);
  });

  test('updateDisk should update a disk', async () => {
    const existingDisk = {
      name: 'existingDisk',
      description: 'Existing Description',
      location: 'Existing Location',
      imageURL: 'https://existingurl.com',
      userId
    };

    const createdDisk = await disksDB.create({ data: existingDisk });

    const updatedData = {
      name: 'Updated Disk Name',
      description: 'Updated Description',
      location: 'Updated Location',
      imageURL: 'https://updatedurl.com',
    };

    await DiskService.updateDisk(createdDisk.id, updatedData);

    const updatedDisk = await disksDB.findFirst({
      where: { id: createdDisk.id },
    });

    expect(updatedDisk).toBeDefined();
    expect(updatedDisk?.name).toBe(updatedData.name);
  });

  test('deleteDisk should delete a disk by ID', async () => {
    const existingDisk = {
      name: 'existingDisk',
      description: 'Existing Description',
      location: 'Existing Location',
      imageURL: 'https://existingurl.com',
      userId
    };

    const createdDisk = await disksDB.create({ data: existingDisk });

    await DiskService.deleteDisk(createdDisk.id);

    const diskAfterDeletion = await disksDB.findFirst({
      where: { id: createdDisk.id },
    });

    expect(diskAfterDeletion).toBeNull();
  });

  test('deleteAllDisks should delete all disks', async () => {
    const diskData1 = {
      name: 'disk1',
      description: 'description1',
      location: 'location1',
      imageURL: 'https://url1.com',
      userId
    };

    const diskData2 = {
      name: 'disk2',
      description: 'description2',
      location: 'location2',
      imageURL: 'https://url2.com',
      userId
    };

    await disksDB.create({ data: diskData1 });
    await disksDB.create({ data: diskData2 });

    await DiskService.deleteAllDisks();

    const disksAfterDeletion = await disksDB.findMany();

    expect(disksAfterDeletion).toHaveLength(0);
  });
});
