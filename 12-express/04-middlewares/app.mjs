import express from 'express';
import morgan from 'morgan';

const app = express();

// app.use(morgan('combined')); // выводит в консоль информацию о запросе
app.use(morgan('short')); // выводит в консоль информацию о запросе

app.use((req, res, next) => {
  let data = '';
  req.on('data', (chunk) => (data += chunk)); // собираем данные из запроса от клиента
  req.on('end', () => {
    // когда данные полностью получены, выводим их в консоль
    console.log(JSON.parse(data)); // конвертируем данные в объект js, если они в формате JSON { name: 'Vitaliy', age: 40, isFrontEndDeveloper: true }
  });
  next();
});

app.use((req, res) => res.send('This is express server'));

app.listen(5000, () => console.log('Server is listening at port 5000'));
