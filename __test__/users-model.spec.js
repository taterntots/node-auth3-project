const Users = require('../routers/users-model');
const db = require('../data/dbConfig.js');

describe('user-model', () => {
  beforeEach(async () => {
    await db('users').truncate();
  })

  describe('add()', () => {
    it('should add a user to the database', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.add({
        username: 'samus',
        password: 'aran',
        department: 'bounty hunter'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
    })
    it('check the name of the added user', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
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

  describe('remove()', () => {
    it('should remove the user from the database', async () => {
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
      await Users.remove(newUsers[0].id);
      //check that the user is gone
      const newerUsers = await db('users');
      expect(newerUsers).toHaveLength(0);
    })
    // it('should show the number of users deleted', async () => {
    //   //adds a user to the database
    //   await Users.add({
    //     username: 'Banjo-Kazooie',
    //     password: 'jiggy',
    //     department: 'sanitation'
    //   })
    //   const deleted = await Users.remove(1);
    //   expect(deleted).toBe(1);
    // })
  })
})