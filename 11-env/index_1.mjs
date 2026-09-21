import * as dotenv from 'dotenv'; // для импорта всех экспортов

// console.log(dotenv);
// console.log(dotenv.default);

dotenv.config();

console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_URL);

// dotenv.config() загружает переменные из файла .env в process.env

// То есть именно вызов:

// dotenv.config();

// читает .env, например:

// DB_USERNAME=admin
// DB_PASSWORD=12345
// DB_URL=localhost

// и после этого они доступны как:

// process.env.DB_USERNAME
// process.env.DB_PASSWORD
// process.env.DB_URL
