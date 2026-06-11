// mjs - мы говорим Node, что это модуль ES6, а не CommonJS
// console.log(module); // undefined, так как в ES6 модулях нет глобальной переменной module
import { season, temperature } from './named-exports.mjs';
import { humidity, isRaining } from './inline-exports.mjs';
import getDataFormServer from './default-export.mjs';

console.log(season);
console.log(temperature);
console.log(humidity);
console.log(isRaining);

getDataFormServer('https://jsonplaceholder.typicode.com/posts/1')
  .then((posts) => {
    console.log(posts);
  })
  .catch((error) => {
    console.error(error);
  });
