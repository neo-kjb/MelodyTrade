import app from'../app'
import request from 'supertest'
import { UserService } from '../user/userService'
import { DiskService } from './diskService';

interface Disk {
    name : string,
    description : string,
    location : string,
    imageURL : string,
}

describe('Disk Routes',()=>{
    describe('/add Adding Disk Route',()=>{
        beforeAll(async()=>{ 
            await UserService.deleteAllUsers()
        })
        afterAll(async()=>{
            await UserService.deleteAllUsers()
        })
        describe('When data is valid',()=>{
            let data:Disk
            let accessToken: string;
            let user
            beforeAll(async()=>{
                await UserService.deleteAllUsers()
                await request(app)
                .post('/auth/signup')
                .send({
                  username: 'username',
                  email: 'username@email.com',
                  password: 'password',
                });
                  const loginResponse = await request(app).post('/auth/login').send({
                  email: 'username@email.com',
                  password: 'password',
                });
                user = loginResponse.body.user                
                accessToken = loginResponse.body.accessToken;

                data ={
                    name: 'diskName',
                    description: 'description',
                    location: 'Somewhere',
                    imageURL: 'https://someUrl.com',
                  }
            })
            afterAll(async()=>{
                await UserService.deleteAllUsers()
            })
            test('Request body should have the authenticated user id', async()=>{
              
              const response=await request(app)
              .post('/disks/add')
              .set('Authorization', `Bearer ${accessToken}`)
              .send(data)
              
              expect(response.body.disk.userId).toBe(user.id)
            })
            test('should return 201 status code',async()=>{
                  const response=await request(app)
                  .post('/disks/add')
                  .set('Authorization', `Bearer ${accessToken}`)
                  .send(data)                  
                  expect(response.statusCode).toBe(201)
            })
            test('should specify JSON in the content type header',async()=>{
              const response=await request(app)
              .post('/disks/add')
              .set('Authorization', `Bearer ${accessToken}`)
              .send(data)
              expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
            })
            test('response must have disk data',async()=>{
              const response=await request(app)
              .post('/disks/add')
              .set('Authorization', `Bearer ${accessToken}`)
              .send(data)
              expect(response.body.disk.id).toBeDefined()
            })
        })
        describe('Missing disk data',()=>{
            beforeAll(async()=>{
                await UserService.deleteAllUsers()
            })
            afterAll(async()=>{
                await UserService.deleteAllUsers()
            })
            test('return 400 status code for validation fail',async()=>{
                await request(app)
                .post('/auth/signup')
                .send({
                  username: 'username',
                  email: 'username@email.com',
                  password: 'password',
                });
                  const loginResponse = await request(app).post('/auth/login').send({
                  email: 'username@email.com',
                  password: 'password',
                });
                const accessToken = loginResponse.body.accessToken;

                const dataBody=[
                    {
                        description: 'description',
                        location: 'Somewhere',
                        imageURL: 'https://someUrl.com',                        
                      },{
                        name: 'diskName',
                        location: 'Somewhere',
                        imageURL: 'https://someUrl.com',                        
                      },{
                        name: 'diskName',
                        description: 'description',
                        imageURL: 'https://someUrl.com',                        
                      },{
                        name: 'diskName',
                        description: 'description',
                        location: 'Somewhere',                        
                      },
                      {}
                ]
                for (const body of dataBody) {
                  const response=await request(app)
                  .post('/disks/add')
                  .set('Authorization', `Bearer ${accessToken}`)
                  .send(body)
                  expect(response.statusCode).toBe(400)
                }
            })
        })

    })
    describe('GET/ Retrieving Disks Route', () => {
        afterEach(async () => {
          await DiskService.deleteAllDisks();
        });
      
        test('should return 200 status code with message for an empty database', async () => {
          const response = await request(app).get('/disks');
          expect(response.statusCode).toBe(200);          
          expect(response.body.message).toBe('No disks found');
        });
      
        test('should return 200 status code with disk data for a non-empty database', async () => {
          await UserService.deleteAllUsers()
          const user = await UserService.createUser({
            username: 'username',
            email: 'username@email.com',
            password: 'password',
          });
      
          const diskData = {
            name: 'diskName',
            description: 'description',
            location: 'Somewhere',
            imageURL: 'https://someUrl.com',
            userId: user.id,
          };
      
          await DiskService.createDisk(diskData);
      
          const response = await request(app).get('/disks');
          expect(response.statusCode).toBe(200);
          expect(response.body.count).toBe(1);
          expect(response.body.data).toHaveLength(1);
          expect(response.body.data[0].id).toBeDefined();
      
          await UserService.deleteAllUsers();
        });
      });

      describe('GET/:id Getting Disk Details',()=>{
        afterAll( async()=>{
          await UserService.deleteAllUsers()
          await DiskService.deleteAllDisks()
        })
        test('should return 200 status code with disk details for a valid disk ID', async () => {
          await UserService.deleteAllUsers()
          const user = await UserService.createUser({
            username: 'username',
            email: 'username@email.com',
            password: 'password',
          });
          const createdDisk = await DiskService.createDisk({
            name: 'TestDisk',
            description: 'TestDescription',
            location: 'TestLocation',
            imageURL: 'https://testurl.com',
            userId: user.id
          });          
          const response = await request(app).get(`/disks/${createdDisk.id}`);        
          expect(response.statusCode).toBe(200);
          
          expect(response.body.id).toBe(createdDisk.id);
          expect(response.body.name).toBe(createdDisk.name);
          
          expect(response.body.user.id).toBe(user.id);
          expect(response.body.user.username).toBe(user.username);
          });

        test('should return 404 status code for an invalid disk ID', async () => {
            const invalidDiskId = 6876876876876876
            const response = await request(app).get(`/disks/${invalidDiskId}`);
            expect(response.statusCode).toBe(404);
            expect(response.body.message).toBe('No disk found');
        });

      })

      describe('PUT/:id/edit edit disk data route',()=>{
        const data ={
          name: 'diskName',
          description: 'description',
          location: 'Somewhere',
          imageURL: 'https://someUrl.com',
        }
        const updatedData ={
          name: 'updatedDiskName',
          description: 'updatedDescription',
          location: 'updatedSomewhere',
          imageURL: 'https://updatedSomeUrl.com',
        }
        let user1AccessToken:string
        let user2AccessToken:string
        beforeAll(async()=>{
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
        })
        afterAll( async()=>{
          await UserService.deleteAllUsers()
          await DiskService.deleteAllDisks()
        })

        test('should respond with 401 if not authenticated', async () => {      
          const addResponse=await request(app)
          .post('/disks/add')
          .set('Authorization', `Bearer ${user1AccessToken}`)
          .send(data)
          
          const editResponse = await request(app)
            .put(`/disks/${addResponse.body.disk.id}/edit`)
            .set('Authorization', `Bearer ${user2AccessToken}`)
            .send(updatedData);            

          expect(editResponse.status).toBe(401);
          expect(editResponse.body.message).toBe('Not Authenticated');
        });
      
        test('should update disk and respond with 200 if authenticated', async () => {
          const addResponse=await request(app)
          .post('/disks/add')
          .set('Authorization', `Bearer ${user1AccessToken}`)
          .send(data)
          const editResponse = await request(app)
            .put(`/disks/${addResponse.body.disk.id}/edit`)
            .set('Authorization', `Bearer ${user1AccessToken}`)
            .send(updatedData);
      
          expect(editResponse.status).toBe(200);
          expect(editResponse.body.message).toBe('Disk updated successfully');
          expect(editResponse.body.updatedDisk.name).toBe('updatedDiskName');
        });
        test('should respond with 400 for invalid input', async () => {
          const invalidData = {
            name: 'd',
            description: 'd',
            location: 'd',
            imageURL: 'd'
          };
          const addResponse=await request(app)
          .post('/disks/add')
          .set('Authorization', `Bearer ${user1AccessToken}`)
          .send(data)
          
          const editResponse = await request(app)
            .put(`/disks/${addResponse.body.disk.id}/edit`)  
            .set('Authorization', `Bearer ${user1AccessToken}`)
            .send(invalidData);
      
          expect(editResponse.status).toBe(400)
          expect(editResponse.body.message).toBe('Invalid input')
          expect(editResponse.body.errors).toBeDefined()
        });
        
      })

      describe('DELETE /:id  delete disk route', () => {
        const data ={
          name: 'diskName',
          description: 'description',
          location: 'Somewhere',
          imageURL: 'https://someUrl.com',
        }
        let user1AccessToken
        let user2AccessToken
        beforeAll(async()=>{
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
        })
        afterAll(async()=>{
          await DiskService.deleteAllDisks()
          await UserService.deleteAllUsers()
        })

        test('should return 401 status code for invalid token', async () => {
          const addResponse=await request(app)
          .post('/disks/add')
          .set('Authorization', `Bearer ${user1AccessToken}`)
          .send(data)

          const deleteResponse = await request(app)
          .delete(`/disks/${addResponse.body.disk.id}`)  
          .set('Authorization', `Bearer ${user2AccessToken}`)
          expect(deleteResponse.statusCode).toBe(401)
          expect(deleteResponse.body.message).toBe('Not Authenticated')
        })

        test('should return 500 status code for malformed token', async () => {
          const addResponse=await request(app)
          .post('/disks/add')
          .set('Authorization', `Bearer ${user1AccessToken}`)
          .send(data)

          const deleteResponse = await request(app)
          .delete(`/disks/${addResponse.body.disk.id}`)  
          .set('Authorization', `Bearer asdasd`)

          expect(deleteResponse.statusCode).toBe(500)
        })

        test("should return 404 status code for the disk absence",async () => {

          const deleteResponse = await request(app)
          .delete(`/disks/00`)  
          .set('Authorization', `Bearer ${user1AccessToken}`)

          expect(deleteResponse.statusCode).toBe(404)
          expect(deleteResponse.body.message).toBe('No disk found')
        });

        test('should return 200 status code for success',async () => {
          const addResponse=await request(app)
          .post('/disks/add')
          .set('Authorization', `Bearer ${user1AccessToken}`)
          .send(data)

          const deleteResponse = await request(app)
          .delete(`/disks/${addResponse.body.disk.id}`)  
          .set('Authorization', `Bearer ${user1AccessToken}`)

          const deletedDisk = await DiskService.getDiskById(addResponse.body.disk.id)
          
          expect(deleteResponse.statusCode).toBe(200)
          expect(deleteResponse.body.message).toBe('Disk deleted successfully')
          expect(deletedDisk).toBeNull()
        })
        
        
        


        


      })
      
});
