'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../controllers/auth')
const users = require('../controllers/users')
const yelp = require('../controllers/yelp')


/*
* User Routes
*/
router.route('/users')
  .post(users.createUser)
  .get(auth.validateUser, users.getUserById)
  .put(users.updateUser)
  .delete(auth.validateUser, users.deleteUser)

router.route('/users/:userId/id')
  .put(users.updateUser)
  .delete(users.deleteUser)

router.route('/allusers')
  .get(users.getAllUsers)
/*
* Auth Routes
*/
router.route('/auth/login')
  .post(auth.loginUser);

/*
* Yelp Routes
*/

router.route('/yelpinfo')
  .get(yelp.getYelp)

// expose routes through router object
module.exports = router;
