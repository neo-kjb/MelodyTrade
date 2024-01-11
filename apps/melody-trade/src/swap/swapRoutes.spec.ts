import app from '../app';
import request from 'supertest';
import { UserService } from '../user/userService';
import { DiskService } from '../disk/diskService';
import { SwapService } from './swapService';

describe('Swap Routes', () => {
  let user1AccessToken;
  let user2AccessToken;
  let user1Id;
  let user2Id;
  let disk1;
  let disk2;
  let disk3;
  beforeAll(async () => {
    await SwapService.deleteAllSwaps();
    await UserService.deleteAllUsers();
    await DiskService.deleteAllDisks();
    await request(app).post('/auth/signup').send({
      username: 'username',
      email: 'username@email.com',
      password: 'password',
    });
    await request(app).post('/auth/signup').send({
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
    user1Id = loginResponse1.body.user.id;
    user2Id = loginResponse2.body.user.id;
    const diskData1 = {
      name: 'disk1',
      description: 'description1',
      location: 'location1',
      imageURL: 'https://url1.com',
      userId: user1Id,
    };

    const diskData2 = {
      name: 'disk2',
      description: 'description2',
      location: 'location2',
      imageURL: 'https://url2.com',
      userId: user2Id,
    };

    const diskData3 = {
      name: 'disk3',
      description: 'description3',
      location: 'location3',
      imageURL: 'https://url3.com',
      userId: loginResponse1.body.user.id,
    };

    disk1 = await DiskService.createDisk(diskData1);
    disk2 = await DiskService.createDisk(diskData2);
    disk3 = await DiskService.createDisk(diskData3);
  });
  afterAll(async () => {
    await SwapService.deleteAllSwaps();
    await UserService.deleteAllUsers();
    await DiskService.deleteAllDisks();
  });
  describe('Post/swaps Create Swap', () => {
    test('should return 201 status code , a message and swap details', async () => {
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id,
        });
      expect(swapResponse.statusCode).toBe(201);
      expect(swapResponse.body.message).toBe('Swap request sent successfully');
      expect(swapResponse.body.swap.id).toBeDefined();
      expect(swapResponse.body.swap.senderId).toBe(disk1.userId);
      expect(swapResponse.body.swap.receiverId).toBe(disk2.userId);
      expect(swapResponse.body.swap.status).toBe('pending');
    });

    test('should return 401 status code for unauthorized users with a message', async () => {
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user2AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id,
        });
      expect(swapResponse.statusCode).toBe(401);
      expect(swapResponse.body.message).toBe('Not Authorized');
    });

    test('should return 404 status code for invalid id(s)', async () => {
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: 0,
        });

      expect(swapResponse.body.message).toBe('Item not found');
      expect(swapResponse.statusCode).toBe(404);
    });

    test('should return 400 status code for the equal items id(s)', async () => {
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk1.id,
        });
      expect(swapResponse.body.message).toBe(
        'Sent and received items cannot be the same'
      );
      expect(swapResponse.statusCode).toBe(400);
    });

    test('should return 400 status code for the user swap with himself ', async () => {
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk3.id,
        });
      expect(swapResponse.body.message).toBe(
        'Cannot swap between your own items'
      );
      expect(swapResponse.statusCode).toBe(400);
    });

    test('should return 400 status code for duplicate swap request for the same items', async () => {
      await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id,
        });
      const swapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id,
        });
      expect(swapResponse.statusCode).toBe(400);
      expect(swapResponse.body.message).toBe(
        'Duplicate swap request for the same items'
      );
    });
  });

  describe('GET / get pending swaps', () => {
    test('should return 200 status code and a count and pending swaps array', async () => {
      await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id,
        });

      const getPendingSwapsResponse = await request(app)
        .get('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`);

      expect(getPendingSwapsResponse.statusCode).toBe(200);
      expect(getPendingSwapsResponse.body.count).toBe(1);
      getPendingSwapsResponse.body.data.map((swap) => {
        expect(swap.status).toBe('pending');
        expect(swap.sentItemId).toBe(disk1.id);
        expect(swap.receivedItemId).toBe(disk2.id);
      });
    });
  });
  describe('GET /:swapId getting swap details', () => {
    beforeEach(async () => {
      await SwapService.deleteAllSwaps();
    });
    test('should return 200 status code and swap detail', async () => {
      const createSwapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk3.id,
          receivedItemId: disk2.id,
        });

      const getSwapDetailsResponse = await request(app)
        .get(`/swaps/${createSwapResponse.body.swap.id}`)
        .set('Authorization', `Bearer ${user1AccessToken}`);
      expect(getSwapDetailsResponse.statusCode).toBe(200);
      expect(getSwapDetailsResponse.body.swap.id).toBe(
        createSwapResponse.body.swap.id
      );
    });

    test('should return 404 status code for swap not found', async () => {
      const getSwapDetailsResponse = await request(app)
        .get('/swaps/11')
        .set('Authorization', `Bearer ${user1AccessToken}`);
      expect(getSwapDetailsResponse.statusCode).toBe(404);
      expect(getSwapDetailsResponse.body.message).toBe('Swap not found');
    });

    test('should return 400 status code for invalid swap ID', async () => {
      const getSwapDetailsResponse = await request(app)
        .get('/swaps/invalidStringId')
        .set('Authorization', `Bearer ${user1AccessToken}`);
      expect(getSwapDetailsResponse.statusCode).toBe(400);
      expect(getSwapDetailsResponse.body.message).toBe('Invalid swap ID');
    });

    test('should return 401 status code for unauthorized user', async () => {
      await request(app).post('/auth/signup').send({
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
          receivedItemId: disk2.id,
        });

      const getSwapDetailsResponse = await request(app)
        .get(`/swaps/${createSwapResponse.body.swap.id}`)
        .set('Authorization', `Bearer ${anotherUserAccessToken}`);

      expect(getSwapDetailsResponse.statusCode).toBe(401);
      expect(getSwapDetailsResponse.body.message).toBe(
        'Unauthorized access to swap details'
      );
    });
  });

  describe('PUT /:swapId/accept accept swap route', () => {
    beforeEach(async () => {
      await SwapService.deleteAllSwaps();
    });
    test('should return 200 status code and a swap status of -accepted- and the receiver only should be the acceptor', async () => {
      const createSwapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk3.id,
          receivedItemId: disk2.id,
        });

      const acceptSwapResponse = await request(app)
        .put(`/swaps/${createSwapResponse.body.swap.id}/accept`)
        .set('Authorization', `Bearer ${user2AccessToken}`);

      expect(acceptSwapResponse.statusCode).toBe(200);
      expect(acceptSwapResponse.body.updatedSwap.id).toBe(
        createSwapResponse.body.swap.id
      );
      expect(acceptSwapResponse.body.updatedSwap.status).toBe('accepted');
      expect(acceptSwapResponse.body.updatedSwap.receiverId).toBe(user2Id);
    });

    test('should return 400 status code for invalid swap ID', async () => {
      const acceptSwapResponse = await request(app)
        .put('/swaps/invalidStringId/accept')
        .set('Authorization', `Bearer ${user2AccessToken}`);
      expect(acceptSwapResponse.statusCode).toBe(400);
      expect(acceptSwapResponse.body.message).toBe('Invalid swap ID');
    });
    test('should return 404 status code for swap not found', async () => {
      const acceptSwapResponse = await request(app)
        .put('/swaps/11/accept')
        .set('Authorization', `Bearer ${user2AccessToken}`);
      expect(acceptSwapResponse.statusCode).toBe(404);
      expect(acceptSwapResponse.body.message).toBe('Swap not found');
    });
    test('should return 401 status code for unauthorized user', async () => {
      const createSwapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id,
        });

      const acceptSwapResponse = await request(app)
        .put(`/swaps/${createSwapResponse.body.swap.id}/accept`)
        .set('Authorization', `Bearer ${user1AccessToken}`);

      expect(acceptSwapResponse.statusCode).toBe(401);
      expect(acceptSwapResponse.body.message).toBe(
        'Unauthorized to accept/reject the swap'
      );
    });
  });

  describe('PUT /:swapId/reject reject swap route', () => {
    beforeEach(async () => {
      await SwapService.deleteAllSwaps();
    });
    test('should return 200 status code and a swap status of -rejected- and the receiver only should be the rejector', async () => {
      const createSwapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk3.id,
          receivedItemId: disk2.id,
        });

      const acceptSwapResponse = await request(app)
        .put(`/swaps/${createSwapResponse.body.swap.id}/reject`)
        .set('Authorization', `Bearer ${user2AccessToken}`);

      expect(acceptSwapResponse.statusCode).toBe(200);
      expect(acceptSwapResponse.body.updatedSwap.id).toBe(
        createSwapResponse.body.swap.id
      );
      expect(acceptSwapResponse.body.updatedSwap.status).toBe('rejected');
      expect(acceptSwapResponse.body.updatedSwap.receiverId).toBe(user2Id);
    });

    test('should return 400 status code for invalid swap ID', async () => {
      const acceptSwapResponse = await request(app)
        .put('/swaps/invalidStringId/reject')
        .set('Authorization', `Bearer ${user2AccessToken}`);
      expect(acceptSwapResponse.statusCode).toBe(400);
      expect(acceptSwapResponse.body.message).toBe('Invalid swap ID');
    });
    test('should return 404 status code for swap not found', async () => {
      const acceptSwapResponse = await request(app)
        .put('/swaps/11/reject')
        .set('Authorization', `Bearer ${user2AccessToken}`);
      expect(acceptSwapResponse.statusCode).toBe(404);
      expect(acceptSwapResponse.body.message).toBe('Swap not found');
    });
    test('should return 401 status code for unauthorized user', async () => {
      const createSwapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id,
        });

      const acceptSwapResponse = await request(app)
        .put(`/swaps/${createSwapResponse.body.swap.id}/reject`)
        .set('Authorization', `Bearer ${user1AccessToken}`);

      expect(acceptSwapResponse.statusCode).toBe(401);
      expect(acceptSwapResponse.body.message).toBe(
        'Unauthorized to accept/reject the swap'
      );
    });
  });

  describe('PUT /:swapId/cancel cancel swap route', () => {
    beforeEach(async () => {
      await SwapService.deleteAllSwaps();
    });
    test('should return 200 status code and a swap status of -canceled- and the receiver only should be the canceler', async () => {
      const createSwapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk3.id,
          receivedItemId: disk2.id,
        });

      const acceptSwapResponse = await request(app)
        .put(`/swaps/${createSwapResponse.body.swap.id}/cancel`)
        .set('Authorization', `Bearer ${user1AccessToken}`);

      expect(acceptSwapResponse.statusCode).toBe(200);
      expect(acceptSwapResponse.body.updatedSwap.id).toBe(
        createSwapResponse.body.swap.id
      );
      expect(acceptSwapResponse.body.updatedSwap.status).toBe('canceled');
      expect(acceptSwapResponse.body.updatedSwap.receiverId).toBe(user2Id);
    });

    test('should return 400 status code for invalid swap ID', async () => {
      const acceptSwapResponse = await request(app)
        .put('/swaps/invalidStringId/cancel')
        .set('Authorization', `Bearer ${user2AccessToken}`);
      expect(acceptSwapResponse.statusCode).toBe(400);
      expect(acceptSwapResponse.body.message).toBe('Invalid swap ID');
    });
    test('should return 404 status code for swap not found', async () => {
      const acceptSwapResponse = await request(app)
        .put('/swaps/11/cancel')
        .set('Authorization', `Bearer ${user2AccessToken}`);
      expect(acceptSwapResponse.statusCode).toBe(404);
      expect(acceptSwapResponse.body.message).toBe('Swap not found');
    });
    test('should return 401 status code for unauthorized user', async () => {
      const createSwapResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id,
        });

      const acceptSwapResponse = await request(app)
        .put(`/swaps/${createSwapResponse.body.swap.id}/cancel`)
        .set('Authorization', `Bearer ${user2AccessToken}`);

      expect(acceptSwapResponse.statusCode).toBe(401);
      expect(acceptSwapResponse.body.message).toBe(
        'Unauthorized to cancel the swap'
      );
    });
  });

  describe('GET /swaps/accepted get accepted swaps', () => {
    beforeEach(async () => {
      await SwapService.deleteAllSwaps();
    });
    test('should return 200 status code and a count and accepted swaps array', async () => {
      const SwapCreateResponse = await request(app)
        .post('/swaps')
        .set('Authorization', `Bearer ${user1AccessToken}`)
        .send({
          sentItemId: disk1.id,
          receivedItemId: disk2.id,
        });

      const acceptSwapResponse = await request(app)
        .put(`/swaps/${SwapCreateResponse.body.swap.id}/accept`)
        .set('Authorization', `Bearer ${user2AccessToken}`);

      const getAcceptedSwapsResponse = await request(app)
        .get('/swaps/accepted')
        .set('Authorization', `Bearer ${user1AccessToken}`);

      console.log(getAcceptedSwapsResponse.body);

      expect(getAcceptedSwapsResponse.statusCode).toBe(200);
      expect(getAcceptedSwapsResponse.body.count).toBe(1);

      getAcceptedSwapsResponse.body.data.map((swap) => {
        expect(swap.status).toBe('accepted');
      });
    });
  });
});
