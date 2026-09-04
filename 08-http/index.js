const http = require('http');

const PORT = 3000;

const comments = [
  { id: 1, text: 'This is the first comment', author: 'John' },
  { id: 2, text: 'This is the second comment', author: 'Jane' },
  { id: 3, text: 'This is the third comment', author: 'Bob' },
];

const server = http.createServer((req, res) => {
  if (req.url === '/html') {
    res.satusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<html><body><div>');
    res.write('<h1>Greetings from http server</h1>');
    res.write('</div></body></html>');
    return res.end();
  }

  if (req.url === '/text') {
    res.satusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('This is plain text');
  }

  if (req.url === '/json') {
    res.satusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify(comments)); // конвертируем массив comments в JSON-строку и отправляем его в ответе
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// res.write - метод для отправки данных в ответе
