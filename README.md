# Dumb Twitter
This is an API for Dumb Twitter. In Dumb Twitter, there are users and posts. 

## Setting up development environment
After cloning the dumbtwitter git repo, set up the following:

1. Node version must be 18 to work with the API locally
2. Nodemon must be installed (`npm i nodemon`)
3. There must be a .env file. The .env file must contain MONGO_URI & JWT_SECRET. JWT_SECRET must be a [sha256 hash] (SECRET must be a sha256 hash https://emn178.github.io/online-tools/sha256.html)

### .env example
    JWT_SECRET=eb5021b23fe31b9f16e0c05b60dadb6744575184efc1b956887b41c7cc97b17e
    MONGO_URI=mongodbLink

## Users
The User object represents the user. Users can sign up, login, update their account, and delete their account.

## Users endpoints

- **POST** /users
- **POST** /users/login
- **PUT** /users/:id
- **DELETE** /users/:id

### The User object

    {
        "name": "danny",
        "email": "tester.com",
        "password": "$2b$08$JvOC3h6jUb6SEuClYusZC.aKTuh.WBaxTgZURwgUdSkX8yfT2gE8W",
        "username": "username",
        "posts": ["65bd87f2858549b6e8916f95", "65b561471971c180722898a7"],
        "likes": ["65b567542c224470a2ba6693"],
        "_id": "65bd87b5858549b6e8916f91",
        "createdAt": "2024-02-03T00:24:21.012Z",
        "updatedAt": "2024-02-03T00:24:21.012Z",
        "__v": 0
    }

#### Attributes

##### name `string`
The user's name. Name is **required**.

##### email `string`
The user's email. Email is **required**.

##### password `string`
A hashed version of the user's password. Password is **required**.

##### posts `array`
An array of IDs representing posts the user has published.

##### likes `array`
An array of IDs representing posts the user has liked.

##### _id `string`
Unique identifier for the object.

### Create a user
`POST /users`  
Creates a user object. There are no authorization headers. Creating a user generates an authorization token.

#### Required properties
- Name
- Email
- Password
- Username

#### Response

    {
        "user": {
            "name": "danny",
            "email": "tester.com",
            "password": "$2b$08$EXdGxZ2G7YdBvjxEhquFjeEaFvTxQVlpUsx1k7iK5YHsxp5K8VJvK",
            "username": "username",
            "posts": [],
            "likes": [],
            "_id": "65bd8e25ae4c19fa103f95ef",
            "createdAt": "2024-02-03T00:51:49.623Z",
            "updatedAt": "2024-02-03T00:51:49.623Z",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJkOGUyNWFlNGMxOWZhMTAzZjk1ZWYiLCJpYXQiOjE3MDY5MjE1MDl9.da0AOWaFMUZq4tETfG2pPpSzb9e3H5dvnTwU9BJxzYY"
    }

### Login a user
`POST /users/login`  
Logs in a user. There are no authorization headers. Creating a user generates a new authorization token.

#### Required properties
- `email`
- `password`

#### Response

    {
        "user": {
            "name": "danny",
            "email": "tester.com",
            "password": "$2b$08$EXdGxZ2G7YdBvjxEhquFjeEaFvTxQVlpUsx1k7iK5YHsxp5K8VJvK",
            "username": "username",
            "posts": [],
            "likes": [],
            "_id": "65bd8e25ae4c19fa103f95ef",
            "createdAt": "2024-02-03T00:51:49.623Z",
            "updatedAt": "2024-02-03T00:51:49.623Z",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJkOGUyNWFlNGMxOWZhMTAzZjk1ZWYiLCJpYXQiOjE3MDY5MjE1MDl9.da0AOWaFMUZq4tETfG2pPpSzb9e3H5dvnTwU9BJxzYY"
    }

### Update a user
`PUT /users/:id`  
Updates a user. Authorization header is required with a Bearer token.

#### Response

    {
        "name": "danny",
        "email": "tester.com",
        "password": "$2b$08$EXdGxZ2G7YdBvjxEhquFjeEaFvTxQVlpUsx1k7iK5YHsxp5K8VJvK",
        "username": "username",
        "posts": [],
        "likes": [],
        "_id": "65bd8e25ae4c19fa103f95ef",
        "createdAt": "2024-02-03T00:51:49.623Z",
        "updatedAt": "2024-02-03T00:51:49.623Z",
        "__v": 0
    }

### Delete a user
`DELETE /users/:id`
Deletes a user. Authorization header is required with a Bearer <token>.

#### Response
Responds with message "User was deleted."

### Show a user
`GET /users/:id`  
Gets a user. There are no authorization headers.

#### Response

    {
        "name": "danny",
        "email": "tester.com",
        "password": "$2b$08$EXdGxZ2G7YdBvjxEhquFjeEaFvTxQVlpUsx1k7iK5YHsxp5K8VJvK",
        "username": "username",
        "posts": [],
        "likes": [],
        "_id": "65bd8e25ae4c19fa103f95ef",
        "createdAt": "2024-02-03T00:51:49.623Z",
        "updatedAt": "2024-02-03T00:51:49.623Z",
        "__v": 0
    }

## Posts
Posts represent the posts that users publish and like. All post routes require user authorization with a Bearer token.

### Posts endpoints

- **GET** /posts
- **POST** /posts
- **POST** /posts/:id/reply
- **POST** /posts/:id/like
- **PUT** /posts/:id
- **DELETE** /:id
- **GET** /:id

### The Post object

    {
        "body": "hello world",
        "isReply": false,
        "likesNum": 3,
        "replies": ["65b565f1bdd545de5e39d95d"],
        "_id": "65bdcb108269f0d72558b6af",
        "parentPost": "65b1c9cedee651c2dab214a2",
        "createdAt": "2024-02-03T05:11:44.620Z",
        "updatedAt": "2024-02-03T05:11:44.753Z",
        "__v": 0,
        "author": "65b55c66acf77c8acd8484b0"
    }

#### Attributes

##### body `string`
The post's body text. Body is **required**.

##### isReply `boolean`
Whether or not a post is a reply to another post. Defaults to **false**.

##### likesNum `number`
The number of likes a post has received

##### author `string`
The ID of the user that published the post.

#### parentPost `string`
The ID of the post that the current post replies to.

##### _id `string`
Unique identifier for the object.

### Index posts
`GET /users`  
Gets an array of all posts.

#### Response

    [
        {
            "_id": "65b1c9b33d657707bae4bed7",
            "body": "This is a post",
            "isReply": false,
            "likesNum": 0,
            "author": "65b1ae01e62eb859f527ecd3",
            "replies": [],
            "createdAt": "2024-01-25T02:38:43.079Z",
            "updatedAt": "2024-01-25T02:38:43.079Z",
            "__v": 0
        },
        {
            "_id": "65b1c9cedee651c2dab214a2",
            "body": "This is another post",
            "isReply": false,
            "likesNum": 0,
            "author": "65b1ae01e62eb859f527ecd3",
            "replies": [],
            "createdAt": "2024-01-25T02:39:10.251Z",
            "updatedAt": "2024-01-25T02:39:10.251Z",
            "__v": 0
        }
    ]

### Publish a post
`POST /users`  
Publishes a new post.

#### Required properties
- `body`

#### Response

    {
        "post": {
            "body": "this is another new post!!!",
            "isReply": false,
            "likesNum": 0,
            "replies": [],
            "_id": "65bdd4058944aecfe8e35676",
            "createdAt": "2024-02-03T05:49:57.840Z",
            "updatedAt": "2024-02-03T05:49:57.960Z",
            "__v": 0,
            "author": "65b55c66acf77c8acd8484b0"
        },
        "user": {
            "_id": "65b55c66acf77c8acd8484b0",
            "name": "Danny",
            "email": "email",
            "password": "$2b$08$UniS5xx.qP4pABbUiJz/Q.p03fdeseBY0B1N.m.qFMOhHyfIhMqPK",
            "username": "username",
            "posts": [
                "65b55c79acf77c8acd8484b3",
                "65b55ca3acf77c8acd8484b8",
                "65b72f75cb42ece671690adf",
                "65b824c09377c681b2ebd7a1",
                "65bd855c726206b387d76353",
                "65bdcb108269f0d72558b6af",
                "65bdd4058944aecfe8e35676"
            ],
            "likes": [
                "65b55c79acf77c8acd8484b3"
            ],
            "createdAt": "2024-01-27T19:41:26.660Z",
            "updatedAt": "2024-02-03T05:49:58.080Z",
            "__v": 8
        }
    }

### Reply to a post
`**POST** /posts/:id/reply`  
Publishes a new post that is a reply to another post. Users cannot reply to a post that is already a reply.

#### Required properties
- `body`

#### Reponse

    {
        "reply": {
            "body": "this is a reply to the other post",
            "isReply": true,
            "likesNum": 0,
            "replies": [],
            "_id": "65bdd5c2afa6fedb86cf8def",
            "author": "65b55c66acf77c8acd8484b0",
            "parentPost": "65b55c79acf77c8acd8484b3",
            "createdAt": "2024-02-03T05:57:22.154Z",
            "updatedAt": "2024-02-03T05:57:22.154Z",
            "__v": 0
        },
        "parentPost": {
            "_id": "65b55c79acf77c8acd8484b3",
            "body": "this is another new post!!!",
            "isReply": false,
            "likesNum": 1,
            "replies": ["65bdd5c2afa6fedb86cf8def"],
            "createdAt": "2024-01-27T19:41:45.626Z",
            "updatedAt": "2024-02-03T05:57:22.284Z",
            "__v": 30,
            "author": "65b55c66acf77c8acd8484b0"
        },
        "user": {
            "_id": "65b55c66acf77c8acd8484b0",
            "name": "danny 3",
            "email": "email",
            "password": "$2b$08$UniS5xx.qP4pABbUiJz/Q.p03fdeseBY0B1N.m.qFMOhHyfIhMqPK",
            "username": "username",
            "posts": ["65bdd4058944aecfe8e35676"],
            "likes": [
                "65b55c79acf77c8acd8484b3"
            ],
            "createdAt": "2024-01-27T19:41:26.660Z",
            "updatedAt": "2024-02-03T05:49:58.080Z",
            "__v": 8
        }
    }

### Like a post
`- **POST** /posts/:id/like`  
Likes a post. Users can like any post whether it is a reply or not. Users cannot like the same post more than once.

#### Response

    {
        "post": {
            "_id": "65b824c09377c681b2ebd7a1",
            "body": "this is another new post!!!",
            "isReply": false,
            "likesNum": 1,
            "replies": [],
            "createdAt": "2024-01-29T22:20:48.579Z",
            "updatedAt": "2024-02-03T06:04:43.555Z",
            "__v": 0,
            "author": "65b55c66acf77c8acd8484b0"
        },
        "user": {
            "_id": "65b55c66acf77c8acd8484b0",
            "name": "danny 3",
            "email": "email",
            "password": "$2b$08$UniS5xx.qP4pABbUiJz/Q.p03fdeseBY0B1N.m.qFMOhHyfIhMqPK",
            "username": "username",
            "posts": [
                "65b55c79acf77c8acd8484b3",
                "65b55ca3acf77c8acd8484b8",
                "65b72f75cb42ece671690adf",
                "65b824c09377c681b2ebd7a1",
                "65bd855c726206b387d76353",
                "65bdcb108269f0d72558b6af",
                "65bdd4058944aecfe8e35676"
            ],
            "likes": [
                "65b55c79acf77c8acd8484b3",
                "65bdd4058944aecfe8e35676",
                "65b824c09377c681b2ebd7a1"
            ],
            "createdAt": "2024-01-27T19:41:26.660Z",
            "updatedAt": "2024-02-03T06:04:43.432Z",
            "__v": 10
        }
    }

### Update a post
`**PUT** /posts/:id`  

#### Response
    {
        "body": "hello world",
        "isReply": false,
        "likesNum": 3,
        "replies": ["65b565f1bdd545de5e39d95d"],
        "_id": "65bdcb108269f0d72558b6af",
        "parentPost": "65b1c9cedee651c2dab214a2",
        "createdAt": "2024-02-03T05:11:44.620Z",
        "updatedAt": "2024-02-03T05:11:44.753Z",
        "__v": 0,
        "author": "65b55c66acf77c8acd8484b0"
    }

### Delete a post
`**DELETE** /:id`

#### Response
Responds with message "Post was deleted."

### Show a post
`**GET** /:id`

#### Reponse

    {
        "body": "hello world",
        "isReply": false,
        "likesNum": 3,
        "replies": ["65b565f1bdd545de5e39d95d"],
        "_id": "65bdcb108269f0d72558b6af",
        "parentPost": "65b1c9cedee651c2dab214a2",
        "createdAt": "2024-02-03T05:11:44.620Z",
        "updatedAt": "2024-02-03T05:11:44.753Z",
        "__v": 0,
        "author": "65b55c66acf77c8acd8484b0"
    }