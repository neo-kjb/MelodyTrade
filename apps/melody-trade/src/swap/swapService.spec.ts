import request from 'supertest'
import app from '../app'
import { PrismaClient } from '@prisma/client'
import { SwapService } from './swapService'
import { DiskService } from '../disk/diskService'
import { UserService } from '../user/userService'



const prisma = new PrismaClient()
const swapDB = prisma.swap

describe('SwapService', () => {
    let user1Id
    let user2Id
    let diskData1
    let diskData2

    beforeAll(async () => {
        await SwapService.deleteAllSwaps()
        await UserService.deleteAllUsers()
        await DiskService.deleteAllDisks()

        await request(app)
            .post('/auth/signup')
            .send({
                username: 'username',
                email: 'username@email.com',
                password: 'password',
            })
        await request(app)
            .post('/auth/signup')
            .send({
                username: 'username2',
                email: 'username2@email.com',
                password: 'password',
            })
        const loginResponse1 = await request(app).post('/auth/login').send({
            email: 'username@email.com',
            password: 'password',
        })
        const loginResponse2 = await request(app).post('/auth/login').send({
            email: 'username2@email.com',
            password: 'password',
        })
        user1Id = loginResponse1.body.user.id
        user2Id = loginResponse2.body.user.id

        diskData1 = {
            name: 'disk1',
            description: 'description1',
            location: 'location1',
            imageURL: 'https://url1.com',
            userId: user1Id
        }

        diskData2 = {
            name: 'disk2',
            description: 'description2',
            location: 'location2',
            imageURL: 'https://url2.com',
            userId: user2Id
        }

    })
    beforeEach(async () => {
        await SwapService.deleteAllSwaps()
    })

    afterAll(async () => {
        await prisma.$disconnect()
        await SwapService.deleteAllSwaps()
        await DiskService.deleteAllDisks()
        await UserService.deleteAllUsers()

    })

    test('createSwap should create a new swap', async () => {
        const diskA = await DiskService.createDisk(diskData1)
        const diskB = await DiskService.createDisk(diskData2)
        const swapData = {
            senderId: user1Id,
            receiverId: user2Id,
            sentItemId: diskA.id,
            receivedItemId: diskB.id,
            status: 'pending'
        }


        const result = await SwapService.createSwap(swapData)

        expect(result).toBeDefined()
        expect(result.senderId).toBe(swapData.senderId)
    })

    test('getPendingSwapsForUser should return pending swaps for a user', async () => {
        const diskA = await DiskService.createDisk(diskData1)
        const diskB = await DiskService.createDisk(diskData2)
        const swapData1 = {
            senderId: user1Id,
            receiverId: user2Id,
            sentItemId: diskA.id,
            receivedItemId: diskB.id,
            status: 'pending'
        }

        const swapData2 = {
            senderId: user1Id,
            receiverId: user2Id,
            sentItemId: diskA.id,
            receivedItemId: diskB.id,
            status: 'accepted'
        }

        await swapDB.create({ data: swapData1 })
        await swapDB.create({ data: swapData2 })

        const result = await SwapService.getPendingSwapsForUser(user1Id)

        expect(result).toHaveLength(1)
        expect(result[0].status).toBe('pending')
    })

    test('getPendingSwapByItems should return a pending swap by items', async () => {
        const diskA = await DiskService.createDisk(diskData1)
        const diskB = await DiskService.createDisk(diskData2)
        const swapData = {
            senderId: user1Id,
            receiverId: user2Id,
            sentItemId: diskA.id,
            receivedItemId: diskB.id,
            status: 'pending'
        }


        await swapDB.create({ data: swapData })

        const result = await SwapService.getPendingSwapByItems(user1Id, diskA.id, diskB.id)

        expect(result).toBeDefined()
        expect(result.status).toBe('pending')
        expect(result.receivedItemId).toBe(swapData.receivedItemId)
        expect(result.sentItemId).toBe(swapData.sentItemId)
    })

    test('updateSwapStatus should update the status of a swap', async () => {
        const diskA = await DiskService.createDisk(diskData1)
        const diskB = await DiskService.createDisk(diskData2)
        const swapData = {
            senderId: user1Id,
            receiverId: user2Id,
            sentItemId: diskA.id,
            receivedItemId: diskB.id,
            status: 'pending'
        }

        const createdSwap = await swapDB.create({ data: swapData })

        await SwapService.updateSwapStatus(createdSwap.id, 'accepted')

        const updatedSwap = await swapDB.findFirst({
            where: { id: createdSwap.id },
        })

        expect(updatedSwap).toBeDefined()
        expect(updatedSwap.status).toBe('accepted')
    })

})
