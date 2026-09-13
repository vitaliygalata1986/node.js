import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  const filePath = './files/index.html';
  if (req.url === '/' && req.method === 'GET') {
    // прочтем файл и отправим его в ответ
    const readStream = fs.createReadStream(filePath);
    // перенаправляем поток чтения в поток ответа клиента
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    readStream.pipe(res);
  }

  if (req.url === '/no-stream' && req.method === 'GET') {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Error reading file on server');
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      }
    });
  }
});

//такой потход  const readStream = fs.createReadStream(filePath) - класный для больших файлов, так как мы не загружаем весь файл в память, а читаем его по частям и сразу отправляем клиенту

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
