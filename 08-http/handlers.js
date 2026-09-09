const fs = require('fs');
const comments = require('./data');
const qs = require('querystring');

function getHome(req, res) {
  fs.readFile('./files/comment-form.html', (err, data) => {
    if (err) {
      // если произошла ошибка при чтении файла
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Server error while loading HTML file');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data); // по окончании чтения файла мы отправляем его содержимое в ответе клиенту
    }
  });
}

function getHtml(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<html><body><div>');
  res.write('<h1>Greetings from http server</h1>');
  res.write('</div></body></html>');
  res.end();
}

function getText(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('This is plain text');
}

function getComments(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(comments)); //
}

function postComment(req, res) {
  res.setHeader('Content-Type', 'text/plain'); // Сервер будет отвечать клиенту обычным текстом.
  /*
  Поэтому все три твоих ответа:
  'Comment data was received'
  'Invalid JSON format'
  'Content-Type must be application/json'
    возвращаются как: Content-Type: text/plain
  */
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    // выполняем обработку данных из формы
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString())); // собираем данные из формы в переменную body
    req.on('end', () => {
      try {
        // обрабатываем данные из формы
        // console.log(body); // id=10&author=Vitaliy&text=text+Vitaly
        // теперь полученную строку нужно преобразовать в объект
        const comment = qs.parse(body); // { id: '10', author: 'Vitaliy',
        // console.log(comment);
        // text: 'text Vitaly' }
        // сделаем конвертацию id в число, т.к. в форме все данные приходят как строки
        comment.id = parseInt(comment.id);
        comments.push(comment); // добавляем новый комментарий в массив
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write('<h1>Comment data was received</h1>');
        res.write('<a href="/">Submit one more comment</a>');
        res.end('');
      } catch (error) {
        res.statusCode = 400;
        res.end('Invalid form data');
      }
    });
  } else if (req.headers['content-type'] === 'application/json') {
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
      try {
        comments.push(JSON.parse(commentJSON)); // добавляем новый комментарий в массив. parse - преобразуем строку JSON в объект
        res.statusCode = 200;
        res.end('Comment data was received');
      } catch (error) {
        res.statusCode = 400; // ошибка клиента, т.к. он отправил не JSON
        res.end('Invalid JSON format');
      }
    }); // окончание получения запроса от клиента
  } else {
    res.statusCode = 400; // это ошибка клиента, т.к. он отправил не JSON
    res.end('Content-Type must be application/json format or as form');
  }
}

function handleNotFound(req, res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Page Not Found</h1>');
}

module.exports = {
  getHome,
  getHtml,
  getText,
  getComments,
  handleNotFound,
  postComment,
};

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

/*
1. Я буду отвечать текстом.

2. Проверяю:
   клиент заявил, что отправляет JSON?

   НЕТ
   → 400
   → "Content-Type must be application/json"

   ДА
   → собираю body
   → JSON.parse()

       удалось
       → 200
       → "Comment data was received"

       не удалось
       → 400
       → "Invalid JSON format"
*/
