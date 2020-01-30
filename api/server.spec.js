const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
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
          expect(res.body).toEqual({ welcome: `to the danger zone!`})
        })
    })
  })
})