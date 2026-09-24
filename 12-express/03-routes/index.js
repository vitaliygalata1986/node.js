const express = require('express');

const commentsRouter = require('./routes/comments');

const app = express();

app.use('/comments', commentsRouter);
// если мы используем метод use, то для этого маршрута мы можем испольpовать все методы http:
// /comments/123
// /comments/

const getRootHandler = (req, res) => {
  res.send('Root route');
};

// users
const getUsersHandler = (req, res) => {
  res.send('Get users route');
};

const getSingleUserHandler = (req, res) => {
  res.send(`Get user route. UserId ${req.params.userId}`);
};

const postsUsersHandler = (req, res) => {
  res.send('Posts users route');
};

app.get('/', getRootHandler);

// users
app.get('/users', getUsersHandler);
app.post('/users', postsUsersHandler);
app.get('/users/:userId', getSingleUserHandler);

app.listen(5000, () => {
  console.log('Server was started on port 5000');
});
