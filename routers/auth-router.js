const router = require('express').Router();
const bc = require('bcryptjs');

const Users = require('./users-model.js');

// *****************************************
// register a new user
// *****************************************
router.post('/register', (req, res) => {
  let credentials = req.body;
  const hash = bc.hashSync(credentials.password, 8); //hashes the password
  credentials.password = hash;

  Users.add(credentials)
    .then(savedUser => {
      res.status(201).json(savedUser);
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
        res.status(200).json({ message: `Logged in! Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
})

module.exports = router;