const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const User = require('../models/user')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Test the user endpoints', () => {
    test('It should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'Mean Mr. Mustard', email: 'paul@beatles.com', password: '1234', username: 'paulm' })        
        expect(response.statusCode).toBe(200)
        expect(response.body.user.name).toBeDefined()
        expect(response.body.user.email).toBeDefined()
        expect(response.body.user.password).toBeDefined()
        expect(response.body.user.username).toBeDefined()   
        expect(response.body).toHaveProperty('token')     
    })
    test('It should login a user', async () => {
        const user = new User({ name: 'Mean Mr. Mustard', email: 'paul@beatles.com', password: '1234', username: 'paulm' })
        await user.save()
        const response = await request(app)
            .post('/users/login')
            .send({ email: 'paul@beatles.com', password: '1234' })
        expect(response.statusCode).toBe(200)        
    })
    test('It should update a user', async () => {
        // create user
        const user = new User({ name: 'Mean Mr. Mustard', email: 'paul@beatles.com', password: '1234', username: 'paulm' })    
        // save
        await user.save()
        // put request
        const response = await request(app)
            .put(`/users/${user._id}`)
            .send({ name: 'Polythene Pam' })
        // expect properties
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toBe('Polythene Pam')
        // expect status code
    }),
    test('It should delete a user', async () => {
        const user = new User({ name: 'Mean Mr. Mustard', email: 'paul@beatles.com', password: '1234', username: 'paulm' })            
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
          .delete(`/users/${user._id}`)
          .set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
    })
})