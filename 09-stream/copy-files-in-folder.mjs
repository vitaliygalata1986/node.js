// скопируем файл file.txt, который находится в папке files
import fs from 'fs';

const fileName = './files/file.txt';
const copiedFileName = './files/file_copy.txt';

const readStream = fs.createReadStream(fileName); // создадим поток для чтения
const writeStream = fs.createWriteStream(copiedFileName); // создадим поток для записи

readStream.pipe(writeStream); // перенаправим поток чтения в поток записи

readStream.on('end', () => console.log('Read stream ended'));
writeStream.on('finish', () => console.log('File was copied'));
writeStream.on('close', () => console.log('Write stream close'));

/*
    fs.createReadStream(fileName) создаёт поток чтения из file.txt. Важно: он не считывает весь файл сразу в readStream. readStream — это объект, который будет постепенно получать данные из файла кусками.

    Потом:

    const writeStream = fs.createWriteStream(copiedFileName);

    создаётся поток записи. Если file_copy.txt ещё не существует, Node.js создаст его. Если существует — по умолчанию его содержимое будет перезаписано.

    А здесь:

    readStream.pipe(writeStream);

    ты буквально говоришь:

    Всё, что приходит из readStream, передавай в writeStream.

    То есть процесс выглядит так:

    file.txt
    ↓
    readStream
    ↓ pipe()
    writeStream
    ↓
    file_copy.txt

    Чтение и запись происходят параллельно, по частям:
        - прочитали кусок → записали кусок
        - прочитали следующий кусок → записали следующий кусок
    Именно поэтому streams особенно удобны для больших файлов: весь файл не нужно держать в оперативной памяти.    
...
*/
