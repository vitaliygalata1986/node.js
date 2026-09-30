import express from 'express';
import morgan from 'morgan';

const app = express();

// app.use(morgan('combined')); // выводит в консоль информацию о запросе
app.use(morgan('short')); // выводит в консоль информацию о запросе

// эта коллбек-функция будет вызываться для всех путей
app.use((req, res) => res.send('This is express server'));

app.listen(5000, () => console.log('Server is listening at port 5000'));
