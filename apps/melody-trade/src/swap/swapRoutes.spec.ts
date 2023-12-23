import app from '../app'
import request from 'supertest'
import { UserService } from '../user/userService'
import { DiskService } from '../disk/diskService';
import { SwapService } from './swapService';

describe('Swap Routes', () => {
  let user1AccessToken
  let user2AccessToken
  let disk1
  let disk2
  let disk3
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
      });
    await request(app)
      .post('/auth/signup')
      .send({
        username: 'username2',
        email: 'username2@email.com',
        password: 'password',
      });
    const loginResponse1 = await request(app).post('/auth/login').send({
      email: 'username@email.com',
      password: 'password',
    });
    const loginResponse2 = await request(app).post('/auth/login').send({
      email: 'username2@email.com',
      password: 'password',
    });
    user1AccessToken = loginResponse1.body.accessToken;
    user2AccessToken = loginResponse2.body.accessToken;
    const diskData1 = {
      name: 'disk1',
      description: 'description1',
      location: 'location1',
      imageURL: 'https://url1.com',
      userId: loginResponse1.body.user.id
    };

    const diskData2 = {
      name: 'disk2',
      description: 'description2',
      location: 'location2',
      imageURL: 'https://url2.com',
      userId: loginResponse2.body.user.id
    };

    const diskData3 = {
      name: 'disk3',
      description: 'description3',
      location: 'location3',
      imageURL: 'https://url3.com',
      userId: loginResponse1.body.user.id
    };

    disk1 = await DiskService.createDisk(diskData1);
    disk2 = await DiskService.createDisk(diskData2);
    disk3 = await DiskService.createDisk(diskData3);

  })
  afterAll(async () => {
    await SwapService.deleteAllSwaps()
    await UserService.deleteAllUsers()
    await DiskService.deleteAllDisks()
  })
  describe('Post/swaps Create Swap', () => {
    test('should return 201 status code , a message and swap details', async () => {
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id
        })
      expect(swapResponse.statusCode).toBe(201)
      expect(swapResponse.body.message).toBe('Swap request sent successfully')
      expect(swapResponse.body.swap.id).toBeDefined()
      expect(swapResponse.body.swap.senderId).toBe(disk1.userId)
      expect(swapResponse.body.swap.receiverId).toBe(disk2.userId)
      expect(swapResponse.body.swap.status).toBe('pending')
    })

    test('should return 401 status code for unauthorized users with a message', async () => {
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user2AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id
        })
      expect(swapResponse.statusCode).toBe(401)
      expect(swapResponse.body.message).toBe('Not Authorized')
    })

    test('should return 404 status code for invalid id(s)', async () => {
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: 0
        })

      expect(swapResponse.body.message).toBe('Invalid item id')
      expect(swapResponse.statusCode).toBe(404)

    })

    test('should return 400 status code for the equal items id(s)', async () => {
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk1.id
        })
      expect(swapResponse.body.message).toBe('Sent and received item IDs cannot be the same')
      expect(swapResponse.statusCode).toBe(400)

    })

    test('should return 400 status code for the user swap with himself ', async () => {
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk3.id
        })
      expect(swapResponse.body.message).toBe('Cannot swap between your own items')
      expect(swapResponse.statusCode).toBe(400)

    })

    test('should return 400 status code for duplicate swap request for the same items', async () => {
      await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id
        })
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id
        })
      expect(swapResponse.statusCode).toBe(400)
      expect(swapResponse.body.message).toBe('Duplicate swap request for the same items')

    })

  })


  describe('GET / get pending swaps', () => {

    test('should return 200 status code and a count and pending swaps array', async () => {
      await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id
        })


      const getPendingSwapsResponse = await request(app)
        .get('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)

      expect(getPendingSwapsResponse.statusCode).toBe(200)
      expect(getPendingSwapsResponse.body.count).toBe(1)
      getPendingSwapsResponse.body.data.map(swap => {
        expect(swap.status).toBe('pending')
        expect(swap.sentItemId).toBe(disk1.id)
        expect(swap.receivedItemId).toBe(disk2.id)
      })
    })



  })
  describe('GET /:swapId getting swap details', () => {
    beforeEach(async () => {
      await SwapService.deleteAllSwaps()
    })
    test('should return 200 status code and swap detail', async () => {
      const createSwapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk3.id,
          receivedItemId: disk2.id
        })

      const getSwapDetailsResponse = await request(app)
        .get(`/swaps/${createSwapResponse.body.swap.id}`)
        .set('Authorization', `Bearer ${user1AccessToken}`)
      expect(getSwapDetailsResponse.statusCode).toBe(200)
      expect(getSwapDetailsResponse.body.swap.id).toBe(createSwapResponse.body.swap.id)
    })

    test('should return 404 status code for swap not found', async () => {
      const getSwapDetailsResponse = await request(app)
        .get('/swaps/11')
        .set('Authorization', `Bearer ${user1AccessToken}`)
      expect(getSwapDetailsResponse.statusCode).toBe(404)
      expect(getSwapDetailsResponse.body.message).toBe('Swap not found')
    })

    test('should return 400 status code for invalid swap ID', async () => {
      const getSwapDetailsResponse = await request(app)
        .get('/swaps/invalidStringId')
        .set('Authorization', `Bearer ${user1AccessToken}`)
      expect(getSwapDetailsResponse.statusCode).toBe(400)
      expect(getSwapDetailsResponse.body.message).toBe('Invalid swap ID')
    })

    test('should return 401 status code for unauthorized user', async () => {
      await request(app)
        .post('/auth/signup')
        .send({
          username: 'anotherusername',
          email: 'anotherusername@email.com',
          password: 'password',
        });
      const loginResponse = await request(app).post('/auth/login').send({
        email: 'anotherusername@email.com',
        password: 'password',
      });
      const anotherUserAccessToken = loginResponse.body.accessToken;
      const createSwapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk3.id,
          receivedItemId: disk2.id
        })

      const getSwapDetailsResponse = await request(app)
        .get(`/swaps/${createSwapResponse.body.swap.id}`)
        .set('Authorization', `Bearer ${anotherUserAccessToken}`)

      expect(getSwapDetailsResponse.statusCode).toBe(401)
      expect(getSwapDetailsResponse.body.message).toBe('Unauthorized access to swap details')
    })


  })


})