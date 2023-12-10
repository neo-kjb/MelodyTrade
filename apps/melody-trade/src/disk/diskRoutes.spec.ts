import app from'../app'
import request from 'supertest'
import { UserService } from '../user/userService'
import { DiskInput } from './validation'


describe('Disk Routes',()=>{
    describe('Adding Disk Route',()=>{
        beforeAll(async()=>{ 
            await UserService.deleteAllUsers()
        })
        afterAll(async()=>{
            await UserService.deleteAllUsers()
        })
        describe('When data is valid',()=>{
            let data:DiskInput
            beforeAll(async()=>{
                await UserService.deleteAllUsers()
                const user= await UserService.createUser({username:'username',email:'username@email.com',password:'password'})
                data ={
                    name: 'diskName',
                    description: 'description',
                    location: 'Somewhere',
                    imageURL: 'https://someUrl.com',
                    userId:user.id
                  }
            })
            afterAll(async()=>{
                await UserService.deleteAllUsers()
            })
            test('should return 201 status code',async()=>{
                  const response=await request(app).post('/disks/add').send(data)                  
                  expect(response.statusCode).toBe(201)
            })
            test('should specify JSON in the content type header',async()=>{
                const response=await request(app).post('/disks/add').send(data)
                expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
            })
            test('respons must have disk data',async()=>{
                const response=await request(app).post('/disks/add').send(data)               
                expect(response.body.disk.id).toBeDefined()
            })
        })
        describe('Missing disk data',()=>{
            let userId:number
            beforeAll(async()=>{
                await UserService.deleteAllUsers()
                const user= await UserService.createUser({username:'username',email:'username@email.com',password:'password'})
                userId=user.id
            })
            afterAll(async()=>{
                await UserService.deleteAllUsers()
            })
            test('return 400 status code for validation fail',async()=>{
                const dataBody=[
                    {
                        description: 'description',
                        location: 'Somewhere',
                        imageURL: 'https://someUrl.com',
                        userId
                      },{
                        name: 'diskName',
                        location: 'Somewhere',
                        imageURL: 'https://someUrl.com',
                        userId
                      },{
                        name: 'diskName',
                        description: 'description',
                        imageURL: 'https://someUrl.com',
                        userId
                      },{
                        name: 'diskName',
                        description: 'description',
                        location: 'Somewhere',
                        userId
                      },{
                        name: 'diskName',
                        description: 'description',
                        location: 'Somewhere',
                        imageURL: 'https://someUrl.com',
                      },
                      {}
                ]
                for (const body of dataBody) {
                    const respons= await request(app).post('/disks/add').send(body)
                    expect(respons.statusCode).toBe(400)
                }
            })
        })

    })
})