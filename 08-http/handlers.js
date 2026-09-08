const comments = require('./data');

function getHtml(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<html><body><div>');
  res.write('<h1>Greetings from http server</h1>');
  res.write('</div></body></html>');
  return res.end();
}

function getText(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  return res.end('This is plain text');
}

function getComments(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(comments)); //
}

function postComment(req, res) {
  let commentJSON = '';

  // событие data - мы будет обрабатывать запрос от клиента частями
  req.on('data', (chunk) => {
    // console.log(chunk.toString());
    /*
      {
        "id": 350, 
        "text": "New comment", 
        "author": "Vitaliy"
      }
    */
    commentJSON += chunk; // мы дописываем данные из след. чанка
  });
  req.on('end', () => {
    comments.push(JSON.parse(commentJSON)); // добавляем новый комментарий в массив. parse - преобразуем строку JSON в объект
    res.statusCode = 200;
    res.end('Comment data was received');
  }); // окончание получения запроса от клиента
}

function handleNotFound(req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html');
  return res.end('<h1>Page Not Found</h1>');
}

module.exports = { getHtml, getText, getComments, handleNotFound, postComment };

/*
  Когда клиент отправляет POST-запрос с JSON, тело запроса передаётся по сети как данные. В Node.js мы через req.on('data') подписываемся на получение частей тела запроса. Каждая такая часть приходит в chunk. Мы постепенно собираем эти части в строку commentJSON. Когда приходит событие end, это означает, что тело одного запроса полностью получено. После этого мы используем JSON.parse(), чтобы преобразовать JSON-строку в JavaScript-объект, и добавляем этот объект в массив comments.

  Клиент отправляет один POST-запрос
        ↓
    тело запроса передаётся как байты
            ↓
    Node.js получает их частями — chunk
            ↓
    событие 'data' может сработать несколько раз
            ↓
    мы складываем chunks в commentJSON
            ↓
    событие 'end'
            ↓
    всё тело запроса уже получено
            ↓
    JSON.parse(commentJSON)
            ↓
    получаем JavaScript-объект
            ↓
    comments.push(...)
*/
