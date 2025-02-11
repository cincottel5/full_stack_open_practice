const {test, after, beforeEach, describe, before} = require("node:test")
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const config = require('../utils/config')
const app = require('../app')
const User = require('../models/user')
const jwtToken = require('../utils/jwt_token')
const api = supertest(app)

describe('there is not users saved', () => {
  
  before(async () => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.disconnect()
      await mongoose.connect(config.MONGODB_URI)
    }
  })

  beforeEach( async () => {
    await User.deleteMany({}, { maxTimeMS: 3000})
  })

  test('succeeds when credentials are valid', async () => {
    await api
      .post('/api/users/')
      .send(helper.initialUser)
      .expect(201)

    const user = await helper.initialUserInDb()
    const loginUser = { 
      username: user.username,
      password: helper.initialUser.password
    }

    await api
      .post('/api/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('fails when credentials are not valid', async () => {
    await api
      .post('/api/users/')
      .send(helper.initialUser)
      .expect(201)

    const user = await helper.initialUserInDb()
    const loginUser = { 
      username: user.username,
      password: 'wrong_password'
    }

    await api
      .post('/api/login')
      .send(loginUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

after(async () => await mongoose.disconnect())

