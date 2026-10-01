import express from 'express';
import morgan from 'morgan';

const app = express();

// app.use(morgan('combined')); // выводит в консоль информацию о запросе
app.use(morgan('short')); // выводит в консоль информацию о запросе

app.use(express.json()); // встроенный middleware, который парсит JSON данные из тела запроса и добавляет их в объект req.body

/*
app.use((req, res, next) => {
  let data = '';
  req.on('data', (chunk) => (data += chunk)); // собираем данные из запроса от клиента
  req.on('end', () => {
    // console.log(JSON.parse(data)); // конвертируем данные в объект js, если они в формате JSON { name: 'Vitaliy', age: 40, isFrontEndDeveloper: true }
    const parsedJSON = JSON.parse(data);
    // добавим parsedJSON в объект запроса req, чтобы использовать его в других middleware
    req.body = parsedJSON;
    next(); // перенесли вызов функции next() в конец, чтобы сначала обработать данные (тоесть дописать req.body), а потом передать управление следующему middleware
  });
  // next();
});
*/

app.use((req, res) => {
  console.log(req.body);
  return res.send('This is express server');
});

app.listen(5000, () => console.log('Server is listening at port 5000'));
