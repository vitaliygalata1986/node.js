require('dotenv').config();
// or import 'dotenv/config' // for esm

// console.log(`Hello ${process.env.HELLO}`);

// console.log(process.env);
// console.log(process.env.SHELL); // путь к исполняемому файлу Node.js
// env - переменные окружения
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_URL);
