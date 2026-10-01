import express from 'express';
import morgan from 'morgan';

const app = express();

// app.use(morgan('combined')); // выводит в консоль информацию о запросе
app.use(morgan('short')); // выводит в консоль информацию о запросе

app.use(express.json()); // встроенный middleware, который парсит JSON данные из тела запроса и добавляет их в объект req.body

app.use(express.urlencoded({ extended: true })); // встроенный middleware, который парсит данные из тела запроса в формате application/x-www-form-urlencoded и добавляет их в объект req.body,  extended: true - опция, которая исопльзует внешнюю библиотеку qs для парсинга данных, extended: false - использует встроенный модуль querystring

app.use((req, res) => {
  console.log(req.body);
  return res.send('This is express server');
});

app.listen(5000, () => console.log('Server is listening at port 5000'));

/*
  morgan()
  → логирует запрос

  express.json()
  → application/json
  → JSON превращает в req.body

  express.urlencoded()
  → application/x-www-form-urlencoded
  → данные HTML-формы превращает в req.body
*/

/*
  morgan('short')

  Morgan — это сторонний middleware для логирования HTTP-запросов.

  Каждый раз, когда клиент отправляет запрос на сервер,
  Morgan выводит информацию о запросе в консоль:
  HTTP-метод, URL, статус ответа, время выполнения и т.д.

  Например:
  POST /users 200 15ms

  'short' — это один из встроенных форматов логирования Morgan.
  Также есть другие форматы, например 'combined', 'common', 'dev' и т.д.

  Morgan НЕ изменяет req.body и не обрабатывает данные запроса.
  Он нужен в основном для наблюдения и отладки запросов.
*/

// app.use(morgan('short'));

/*
  express.json()

  Встроенный middleware Express для обработки тела HTTP-запроса,
  если клиент отправляет данные в формате JSON:

  Content-Type: application/json

  Например клиент отправляет:

  {
    "name": "Alex",
    "age": 25
  }

  По сети тело запроса приходит как набор байтов / текстовых данных.
  express.json() читает это тело, парсит JSON
  и превращает его в обычный JavaScript-объект.

  После этого данные становятся доступны через:

  req.body

  Например:

  req.body = {
    name: 'Alex',
    age: 25
  }

  Без express.json() Express сам по себе не распарсит JSON-тело,
  поэтому req.body для такого запроса обычно будет undefined.
*/
// app.use(express.json());

/*
  express.urlencoded({ extended: true })

  Встроенный middleware Express для обработки данных,
  которые обычно приходят из обычных HTML-форм.

  HTML-форма часто отправляет данные с Content-Type:

  application/x-www-form-urlencoded

  Например форма:

  <form method="POST">
    <input name="username" value="Alex">
    <input name="age" value="25">
  </form>

  отправит данные примерно в таком виде:

  username=Alex&age=25

  Это НЕ JSON.

  express.urlencoded() читает эту строку,
  парсит её и превращает в обычный JavaScript-объект.

  После обработки:

  req.body = {
    username: 'Alex',
    age: '25'
  }

  То есть этот middleware особенно нужен,
  когда данные приходят из HTML-форм
  в формате application/x-www-form-urlencoded.


  extended: true

  Определяет, насколько сложные структуры можно парсить.

  При extended: true можно работать с вложенными объектами
  и более сложными структурами данных.

  Например запрос:

  user[name]=Alex&user[age]=25

  может превратиться в:

  req.body = {
    user: {
      name: 'Alex',
      age: '25'
    }
  }

  При extended: false поддерживаются в основном
  простые пары ключ=значение без сложной вложенности.

  В современных версиях Express детали реализации могут отличаться,
  поэтому практичнее запоминать смысл:

  extended: true -> поддерживает более сложные / вложенные данные.
*/
// app.use(express.urlencoded({ extended: true }));
