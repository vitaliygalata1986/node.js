import express from 'express';
import morgan from 'morgan';
import qs from 'querystring';

const app = express();

// app.use(morgan('combined')); // выводит в консоль информацию о запросе
app.use(morgan('short')); // выводит в консоль информацию о запросе

app.use(express.json()); // встроенный middleware, который парсит JSON данные из тела запроса и добавляет их в объект req.body

app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    // console.log(req.headers['content-type']); // application/x-www-form-urlencoded
    let data = '';
    req.on('data', (chunk) => (data += chunk.toString()));
    req.on('end', () => {
      const parsedFromData = qs.parse(data); // name=Vitaliy&age=40&isFrontEndDeveloper=true - нам нужно это конвертировать в объект JS, то есть в { name: 'Vitaliy', age: '40', isFrontEndDeveloper: 'true' }
      req.body = parsedFromData;
      next();
    });
  } else {
    next();
  }
});

app.use((req, res) => {
  console.log(req.body);
  return res.send('This is express server');
});

app.listen(5000, () => console.log('Server is listening at port 5000'));
