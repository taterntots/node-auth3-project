const router = require('express').Router();
const restricted = require('../middleware/restricted-middleware.js');
const Users = require('./users-model.js');

// *****************************************
// gets a list of all users in database
// *****************************************
router.get('/', restricted, onlyDepartment('sales'), (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'You shall not pass!' })
    })
})
// *****************************************
// deletes a user from the database
// *****************************************
router.delete('/:id', (req, res) => {
  Users.remove(req.params.id)
    .then(deleted => {
      res.status(200).json({ success: `the user was deleted` });
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'There was an error deleting your project from the database' })
    })
})

function onlyDepartment(department) {
  return function (req, res, next) {
    // console.log(req.user);
    if (req.user && req.user.department && req.user.department.toLowerCase() === department) {
      next();
    } else {
      res.status(403).json({ you: 'are not part of the cool kids club' })
    }
  }
}

module.exports = router;