import express from 'express';

const app = express();

// функция - middleware - обрабатывает все запросы от клиента
// она не меняет объекты запроса и ответа
const logger = (req, res, next) => {
  console.log(req.method, req.path);
  next(); // благодаря next - мы перейдем к след. функции - коллбек-функции дальше
};

app.use(logger);

// эта коллбек-функция будет вызываться для всех путей
app.use((req, res) => res.send('This is express server'));

// app.use(logger, (req, res) => res.send('This is express server'));

app.listen(5000, () => console.log('Server is listening at port 5000'));
