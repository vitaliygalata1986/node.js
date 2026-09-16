import fs from 'fs';
import path from 'path';
// console.log(process.argv);

// process.argv — массив аргументов командной строки
// 1 — путь к исполняемому файлу Node.js
// 2 — путь к запускаемому JavaScript-файлу
// 3 — имя файла
// 4 — содержимое файла

if (!process.argv[2] || !process.argv[3]) {
  console.log('Необходимо указать имя файла и его содержимое');
  process.exit(0); // выход из процесса с кодом 0 (успешное завершение)
}

// console.log('Continue...');

const fileName = process.argv[2];
const lineQty = parseInt(process.argv[3]);

if (isNaN(lineQty)) {
  console.log('Количество строк должно быть числом');
  process.exit(0); // выход из процесса с кодом 0 (успешное завершение)
}

// корректно запускаем скрипт: node createfile.js test.txt 10

// создадим writeStream для записи в файл

const writeStream = fs.createWriteStream(path.join('./files', fileName)); // join позволяет объединить пути - ./files/file.txt
// const writeStream = fs.createWriteStream(`./files/${fileName}`); // join позволяет объединить пути - ./files/test.txt

// этот цикл блокирует event loop
console.log('start', performance.now());
for (let i = 1; i <= lineQty; i++) {
  writeStream.write(`This is line a number ${i} in the auto-generated file\n`);
}
console.log('End', performance.now());

setTimeout(() => {
  // эта коллбек функция ожидала, пока цикл завершится
  console.log('Timeout');
  performance.now();
}, 0);

writeStream.end(() => {
  console.log(
    `Auto-generated file ${fileName} with ${lineQty} lines has been created`,
  );
});
