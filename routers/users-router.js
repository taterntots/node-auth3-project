const router = require('express').Router();
const restricted = require('../middleware/restricted-middleware.js');
const Users = require('./users-model.js');

// *****************************************
// gets a list of all users in database
// *****************************************
router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'You shall not pass!' })
    })
})

module.exports = router;