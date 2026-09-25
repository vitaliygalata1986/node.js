const express = require('express');

const commentsRouter = require('./routes/comments');
const usersRouter = require('./routes/users');

const app = express();

app.use('/comments', commentsRouter);
// если мы используем метод use, то для этого маршрута мы можем испольpовать все методы http:
// /comments/123
// /comments/

app.use('/users', usersRouter);

const getRootHandler = (req, res) => {
  res.send('Root route');
};

app.get('/', getRootHandler);

app.listen(5000, () => {
  console.log('Server was started on port 5000');
});
