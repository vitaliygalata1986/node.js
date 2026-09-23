const express = require('express');

const app = express();

const getRootHandler = (req, res) => {
  res.send('Get  root route');
};

const getCommentsHandler = (req, res) => {
  res.send('Get comments route');
};

const postCommentsHandler = (req, res) => {
  res.send('Post comments route');
};

const getCommentHandler = (req, res) => {
  // console.log(req.params); //  { commentId: '100' }
  res.send(`Get comment route. CommetnId ${req.params.commentId}`);
};

app.get('/', getRootHandler);
app.get('/comments', getCommentsHandler);
app.post('/comments', postCommentsHandler);
app.get('/comments/:commentId', getCommentHandler);

app.listen(5000, () => {
  console.log('Server was started on port 5000');
});
