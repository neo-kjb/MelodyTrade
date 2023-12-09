import request from 'supertest'
import app from './app'
import { UserService } from './user/userService'
import { hashPassword } from './user/usecase'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient



describe('POST /auth/login',()=>{
    beforeEach(async () => {
        await prisma.user.deleteMany();
      
        const userData = {
          username: 'username',
          email: 'username@email.com',
          password: await hashPassword('password'),
        };
        await UserService.createUser(userData);
      });

    describe('Given a username and password',()=>{
        const loginRequestBody = {
            email: 'username@email.com',
            password: 'password',
          }
        test('should respond with a 200 status code',async()=>{
            const response=await request(app).post('/auth/login').send(loginRequestBody)
            expect(response.statusCode).toBe(200)
        })

        test('should specify JSON in the content type header',async()=>{
            const response=await request(app).post('/auth/login').send(loginRequestBody)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })

        test('response has user id',async()=>{
            const response=await request(app).post('/auth/login').send(loginRequestBody)
            expect(response.body.user.id).toBeDefined()
        })
    })

    describe('when username and password missing',()=>{
        test('should respond with 400 status code for validation error',async()=>{

            const bodyData=[
                {email:'username@email.com'},
                {password:'password'},
                {}
            ]
            for (const body of bodyData) {
                const response=await request(app).post('/auth/login').send(body)
                expect(response.statusCode).toBe(400)
            }
        })

        test('should respond with 404 status code for user not found',async()=>{
            const response=await request(app).post('/auth/login').send({
                email:'notExistingUser@email.com',
                password:'password'
            })
            expect(response.statusCode).toBe(404)
        })
        test('should respond with 401 status code for wrong password',async()=>{
            const response=await request(app).post('/auth/login').send({
                email:'username@email.com',
                password:'wrongPassword'
            })
            expect(response.statusCode).toBe(401)
        })
    })
})