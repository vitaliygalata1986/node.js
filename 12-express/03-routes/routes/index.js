const express = require('express');

const commentsRouter = require('./comments');
const usersRouter = require('./users');
const rootRouter = require('./root');

const router = express.Router();

router.use('/comments', commentsRouter);
router.use('/users', usersRouter);
router.use('/', rootRouter); // принципиально самый последний, так как если мы расположем выше, то сначала будет обрабатываться rootRouter (из-за use)

module.exports = router;
