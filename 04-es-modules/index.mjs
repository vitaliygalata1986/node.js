// mjs - мы говорим Node, что это модуль ES6, а не CommonJS
import DEFAULT_SERVER, {
  USERNAME as MY_USERNAME,
  PASSWORD,
} from './mixed-exports.mjs';

console.log('Default Server:', DEFAULT_SERVER);
console.log('Username:', MY_USERNAME);
console.log('Password:', PASSWORD);
