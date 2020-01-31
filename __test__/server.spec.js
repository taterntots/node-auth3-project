const request = require('supertest');
const server = require('../api/server.js');
const Users = require('../routers/users-model');
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
  describe('DELETE /users', () => {
    it('should return 200 OK status code when successfully deleted', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.add({
        username: 'Banjo-Kazooie',
        password: 'jiggy',
        department: 'sanitation'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
      //delete the user by id
      return request(server).delete('/api/users/1')
        .then(res => {
          //check that status code is 200
          expect(res.status).toBe(200);
        })
      // await Users.remove(newUsers[0].id);
      // //check that the user is gone
      // const newerUsers = await db('users');
      // expect(newerUsers).toHaveLength(0);
    })
  })
  describe('DELETE /users', () => {
    it('should return 200 OK status code when successfully deleted', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.add({
        username: 'Banjo-Kazooie',
        password: 'jiggy',
        department: 'sanitation'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
      //delete the user by id
      return request(server).delete('/api/users/1')
        .then(res => {
          //check that status code is 200
          expect(res.status).toBe(200);
        })
    })
  })
})