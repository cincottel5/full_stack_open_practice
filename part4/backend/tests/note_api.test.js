const { test, after, beforeEach, describe, before } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const config = require('../utils/config')
const app = require('../app')
const Note = require('../models/note')
const User = require('../models/user')
const jwtToken = require('../utils/jwt_token')
const api = supertest(app)

// node --test-only ./tests/note_api.test.js

describe('when there is initially some notes saved', () => {
  
  before( async () => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.disconnect()
      await mongoose.connect(config.MONGODB_URI)
      console.log('db was not connected, now it is.')
    }
  })
  
  beforeEach( async () => { 
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(e => e.content)
    
    assert(contents.includes('Browser can execute only JavaScript'))
  })

  describe('viewing a specific note', () => {
    
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInBd()
      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonExistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    
    test('succeeds with valid data', async () => {
      await User.deleteMany()
      await new User(helper.initialUser).save()
      const user = await helper.initialUserInDb()
      const token = jwtToken.newToken(user)

      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      }

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const notesAtEnd = await helper.notesInBd()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
    
      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status code 400 if data invalid', async () => {
      await User.deleteMany()
      await new User(helper.initialUser).save()
      const user = await helper.initialUserInDb()
      const token = jwtToken.newToken(user)
      
      const newNote = { important: true }

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(400)
    
      const notesAtEnd = await helper.notesInBd()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })

    test('fails when token is not supplied', async () => {
      const newNote = { important: true }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(401)

        const notesAtEnd = await helper.notesInBd()
        assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInBd()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAtEnd = await helper.notesInBd()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length -1)

      const contents = notesAtEnd.map(r => r.content)
      assert(!contents.includes(noteToDelete.content))
    })
  })
})

after(async () => {
  await mongoose.disconnect()
})

