const Users = require('../routers/users-model');
const db = require('../data/dbConfig.js');

describe('user-model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  })

  describe('insert()', () => {
    it('should add a user to the database', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds the user to the database
      await Users.add({
        username: 'samus',
        password: 'aran',
        department: 'bounty hunter'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
    })
    it('check the name of the inserted character', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds the user to the database
      await Users.add({
        username: 'solid snake',
        password: 'FOXDIE',
        department: 'espionage'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers[0].username).toBe('solid snake');
    })
  })
})