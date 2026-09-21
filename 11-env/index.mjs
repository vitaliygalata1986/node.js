// первый вариант:
// import dotenv from 'dotenv';
// dotenv.config();

// второй вариант боллее предпочтительный:
import { config } from 'dotenv';
config();

console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_URL);
