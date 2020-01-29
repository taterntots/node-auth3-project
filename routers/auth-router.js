const router = require('express').Router();
const bc = require('bcryptjs');

const Users = require('./users-model.js');

// *****************************************
// register a new user
// *****************************************
router.post('/register', (req, res) => {

})
// *****************************************
// login user
// *****************************************
router.post('/login', (req, res) => {
  
})

module.exports = router;