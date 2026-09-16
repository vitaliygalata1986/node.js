import fs from 'fs';
import path from 'path';

const sourceDir = './files';
const destinationDir = './copird-files';

if (!fs.existsSync(sourceDir)) {
  // если директория не существует
  console.warn(`Source dir ${sourceDir} doesn't exist!`);
  console.log('Exiting...');
  process.exit(0); // выход из процесса с кодом 0 (успешное завершение)
}

if (fs.existsSync(destinationDir)) {
  // то удалим директорию
  fs.rmSync(destinationDir, { recursive: true });
  // console.log('Destination dir removed');
}

fs.mkdirSync(destinationDir); // создадим директорию

// дальше копируем файлы из sourceDir в destinationDir с пом. потока
// также будем выполнять переименование файлов, добавляя номер каждого файла в начало

fs.readdir(sourceDir, (err, fileNames) => {
  // прочитаем содержимое всех файлов в sourceDir
  if (err) {
    console.log(err);
    process.exit(1); // выход из процесса с кодом 1 (ошибка)
  }
  // console.log(fileNames);

  fileNames.forEach((fileName, index) => {
    const sourceFilePath = path.join(sourceDir, fileName); // путь к файлу, который мы копируем
    // console.log(sourceFilePath);
    // названия файлов к целевой папке
    const destinationFilePath = path.join(
      destinationDir,
      `${index + 1}-${fileName}`,
    ); // путь к новому файлу
    // console.log(destinationFilePath);

    // создаем два потока
    // первый - для чтения мз файла
    const readFileStream = fs.createReadStream(sourceFilePath);
    // второй - для записи в файл
    const writeFileStream = fs.createWriteStream(destinationFilePath);
    // поток для чтения направляется в поток для записи
    readFileStream.pipe(writeFileStream);
    writeFileStream.on('finish', () => {
      console.log(`File ${fileName} was copied`);
    });
  });
});

// Используем синхронное удаление,
// чтобы следующая строка выполнилась только после полного удаления директории.
// Не нужно строить цепочку callback'ов:
// Поэтому для небольших CLI-скриптов, которые просто последовательно копируют/удаляют файлы, Sync часто вполне нормально.

/*
    Sync = проще, но блокирует выполнение.
    Async = сложнее управлять порядком, но Node может продолжать заниматься другими задачами.
*/

// readdir - возвращает массив всех файлов в директории (имена файлов, а не пути к ним)
