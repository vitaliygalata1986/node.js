const http = require('http');

const {
  getHtml,
  getText,
  getComments,
  handleNotFound,
  postComment,
} = require('./handlers');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/html') {
    return getHtml(req, res);
  }
  if (req.method === 'GET' && req.url === '/text') {
    return getText(req, res);
  }

  if (req.method === 'GET' && req.url === '/comments') {
    return getComments(req, res);
  }

  if (req.method === 'POST' && req.url === '/comments') {
    return postComment(req, res);
  }

  return handleNotFound(req, res);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// res.write - метод для отправки данных в ответе
