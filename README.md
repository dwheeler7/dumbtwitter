# Dumb Twitter
This is an API for Dumb Twitter. In Dumb Twitter, there are users and posts. 

## Prerequisites
- Node version must be 18 to work with the API locally
- There must be a .env file
- The .env file must contain MONGO_URI & JWT_SECRET
- JWT_SECRET must be a [sha256 hash](SECRET must be a sha256 hash https://emn178.github.io/online-tools/sha256.html)

### .env example
    JWT_SECRET=eb5021b23fe31b9f16e0c05b60dadb6744575184efc1b956887b41c7cc97b17e
    MONGO_URI=mongodbLink

## Users
The User object represents the user. Users can sign up, login, update their account, and delete their account.

**Endpoints**
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

**name** `string`
The user's name. 

**email** `string`
The user's email. 

**password** `string`
A hashed version of the user's password. 

**posts** `array`
An array of IDs representing posts the user has published.

**likes** `array`
An array of IDs representing posts the user has liked.

**_id** `string`
Unique identifier for the object.