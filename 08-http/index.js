const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  // console.log(req);
  res.satusCode = 200; // явно устанавливаем статус ответа от сервера

  // res.setHeader('Content-Type', 'text/plain'); // явно устанавливаем заголовок ответа от сервера - это означает, что мы отправляем текст в формате plain text а не html страницу

  res.setHeader('Content-Type', 'text/html'); // явно устанавливаем заголовок ответа от сервера - это означает, что мы отправляем текст в формате html страницы

  // res.end('Greetings from http server');
  res.end('<h1>Greetings from http server</h1>');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
