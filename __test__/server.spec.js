const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig');

describe('server.js', () => {
  beforeEach(async () => {
    await db('users').truncate();
  })

  describe('index route', () => {
    it('should return 200 OK status for danger zone route', () => {
      // make a GET request to /
      return request(server).get('/')
        .then(res => {
          //check that status code is 200
          expect(res.status).toBe(200);
        })
    })

    it('should return JSON', () => {
      // make a GET request to /
      return request(server).get('/')
        .then(res => {
          // check that the type is JSON
          expect(res.type).toMatch(/json/i)
        })
    })

    it('should return JSON', () => {
      // make a GET request to /
      return request(server).get('/')
        .then(res => {
          // check that the body of the JSON object is correct
          expect(res.body).toEqual({ welcome: `to the danger zone!` })
        })
    })
  })
  describe('GET /users', () => {
    it('should return 401 error status for user route if no token', () => {
      // make a GET request to /
      return request(server).get('/api/users')
        .then(res => {
          //check that status code is 200
          expect(res.status).toBe(401);
        })
    })
  })
})