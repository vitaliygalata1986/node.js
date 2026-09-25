const express = require('express');

const {
  getUsersHandler,
  getSingleUserHandler,
  postsUsersHandler,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsersHandler);
router.get('/:userId', getSingleUserHandler);
router.post('/', postsUsersHandler);

module.exports = router;
