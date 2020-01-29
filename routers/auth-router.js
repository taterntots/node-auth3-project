const router = require('express').Router();
const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const Users = require('./users-model.js');

// *****************************************
// register a new user
// *****************************************
router.post('/register', (req, res) => {
  let credentials = req.body;
  const hash = bc.hashSync(credentials.password, 8); //hashes the password
  credentials.password = hash;
  console.log(credentials);

  Users.add(credentials)
    .then(savedUser => {
      const token = generateToken(savedUser);
      console.log(savedUser);
      res.status(201).json({ savedUser, token });
    })
    .catch(error => {
      res.status(500).json(error);
    });
})
// *****************************************
// login user
// *****************************************
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bc.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({ message: `Logged in! Welcome ${user.username}!`, token }); //attaches token as part of the response
      } else {
        res.status(401).json({ message: 'Invalid Credentials. You shall not pass!' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

function generateToken(user) {
  const payload = {
    userId: user.id, //sub in payload is what the token is about
    username: user.username,
    department: user.department
  }

  const options = {
    expiresIn: '1d' //check documentation for other options
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;