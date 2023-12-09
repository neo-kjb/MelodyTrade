import request from 'supertest'
import app from './app'
import { UserService } from './user/userService'
import { hashPassword, isEqualPassword } from './user/usecase'
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

describe('POST /auth/signup',()=>{
    beforeEach(async()=>{
        await prisma.user.deleteMany()
    })
    describe('given username, email and password',()=>{
        const signupRequestBody = {
            username:'username',
            email: 'username@email.com',
            password: 'password',
          }

        test('password hashed correctly',async()=>{
            const response= await request(app).post('/auth/signup').send(signupRequestBody)
            const isEqual=await isEqualPassword(signupRequestBody.password,response.body.user.password)
            expect(isEqual).toBe(true)
        })
        test('return 201 status code for success',async()=>{
            const response= await request(app).post('/auth/signup').send(signupRequestBody)
            expect(response.statusCode).toBe(201)
        })
        test('response has user id',async()=>{
            const response=await request(app).post('/auth/signup').send(signupRequestBody)
            expect(response.body.user.id).toBeDefined()
        })
        test('should specify JSON in the content type header',async()=>{
            const response=await request(app).post('/auth/signup').send(signupRequestBody)
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })

    describe('missing username, email and password',()=>{
        test('return 400 status code for validation fail',async()=>{
            const bodyData=[
                {email:'username@email.com'},
                {password:'password'},
                {username:'username'},
                {}
            ]
            for (const body of bodyData) {
                const response=await request(app).post('/auth/signup').send(body)
                expect(response.statusCode).toBe(400)
            }
        })
        test('return 400 status code for email already exist',async()=>{
            const userData = {
                username:'username',
                email: 'username@email.com',
                password: 'password',
              }
              await UserService.createUser(userData)
              const response=await request(app).post('/auth/signup').send(userData)
              expect(response.statusCode).toBe(400)
    
        })
    })
})
