const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(9090, () => console.log('Testing on PORT 9090'))
const User = require('../models/user')
const Post = require('../models/post')
let mongoServer
let authToken
let user // test variable in global scope...bad??

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();    
    await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })

    const response = await request(app)
        .post('/users')
        .send({ name: 'Mean Mr. Mustard', email: 'paul@beatles.com', password: '1234', username: 'paulm' })
        authToken = response.body.token    

    user = response.body.user
});

afterAll(async () => {
    await mongoose.connection.close()
    await mongoServer.stop()
    server.close()
});

describe('Test the post endpoints', () => {
    test('It should index posts', async () => {        
        const existingPost = new Post({ body: "test" })   
        await existingPost.save()     

        const response = await request(app)
            .get('/posts')   
            .set('Authorization', `Bearer ${authToken}`)                         
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(1)        
    }),

    test('It should create a post', async () => {               
        const response = await request(app)
            .post('/posts')        
            .set('Authorization', `Bearer ${authToken}`)                         
            .send({ body: 'Mean Mister Mustard sleeps in the park' })
        expect(response.statusCode).toBe(200)
        expect(response.body.newPost.body).toBeTruthy()
        expect(user.posts[0]).toBe(response.body.newPost.body._id)
    }),
    test('It should create a reply', async () => {               
        const parentPost = new Post({ body: 'Mean Mister Mustard sleeps in the park' })        
        await parentPost.save()
        const parentId = parentPost._id
        const response = await request(app)
            .post(`/posts/${parentId}/reply`)        
            .set('Authorization', `Bearer ${authToken}`)                         
            .send({ body: 'Shaves in the dark trying to save paper', parentPost: parentId })
        expect(response.statusCode).toBe(200)                        
    }),
    test('It should update a post', async () => {
        const post = new Post({ body: 'Mean Mister Mustard sleeps in the park' })
        await post.save()

        const response = await request(app)
            .put(`/posts/${post._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ body: 'Shaves in the dark trying to save paper'} )
            expect(response.statusCode).toBe(200)                                    
    }),
    test('It should delete a post', async () => {
        const post = new Post({ body: 'Mean Mister Mustard sleeps in the park' })
        await post.save()

        const response = await request(app)
            .delete(`/posts/${post._id}`)
            .set('Authorization', `Bearer ${authToken}`)
        expect(response.statusCode).toBe(200) 
    }),

    test('It should show a post', async () => {
        const post = new Post({ body: 'Mean Mister Mustard sleeps in the park' })
        await post.save()
        const response = await request(app)
            .get(`/posts/${post._id}`)
            .set('Authorization', `Bearer ${authToken}`)
        expect(response.statusCode).toBe(200) 
    })
})