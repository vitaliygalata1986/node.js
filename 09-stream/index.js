const fs = require('fs');

const readStream = fs.createReadStream('./f.txt', 'utf-8');
const writeStream = fs.createWriteStream('./f_copy.txt');

readStream.pipe(writeStream);

writeStream.on('close', () => {
  console.log('File copied successfully.');
});

/*

    Здесь ты копируешь содержимое файла f.txt в новый файл f_copy.txt с помощью потоков (streams).

    Разберём построчно.

    const fs = require('fs');

    Подключаем встроенный модуль Node.js fs — File System, который позволяет работать с файлами.

    const readStream = fs.createReadStream('./f.txt', 'utf-8');

    Создаём поток чтения.

    То есть Node.js открывает:

    f.txt

    и начинает читать его частями (chunks), а не загружать весь файл целиком в память.

    'utf-8' говорит:

    интерпретируй прочитанные данные как текст.

    Например, если f.txt содержит:

    Hello world!
    How are you?

    readStream будет постепенно отдавать эти данные.

    Дальше:

    const writeStream = fs.createWriteStream('./f_copy.txt');

    Создаём поток записи.

    Node.js создаст файл:

    f_copy.txt

    если его ещё нет.

    Если он уже существует, по умолчанию его содержимое будет перезаписано.

    Теперь самая важная строка:

    readStream.pipe(writeStream);

    pipe() означает буквально:

    readStream
        ↓
        ↓ данные
        ↓
    writeStream

    То есть:

    f.txt → readStream → writeStream → f_copy.txt

    Node.js делает примерно следующее автоматически:

    readStream.on('data', chunk => {
        writeStream.write(chunk);
    });

    а когда чтение закончилось:

    writeStream.end();

    Но pipe() делает это всё за тебя, плюс нормально управляет скоростью чтения и записи.

    Представь, что файл большой:

    1 GB

    Node.js не делает:

    загрузить 1 GB в RAM
    ↓
    записать 1 GB

    Вместо этого происходит что-то вроде:

    прочитали кусок
        ↓
    записали кусок

    прочитали следующий кусок
        ↓
    записали кусок

    прочитали следующий кусок
        ↓
    записали кусок

    Поэтому streams очень удобны для больших файлов.

    Теперь:

    writeStream.on('close', () => {
        console.log('File copied successfully.');
    });

    Ты подписываешься на событие:

    close

    Когда файловый поток полностью закрывается, выполняется:

    console.log('File copied successfully.');

    То есть общий процесс такой:

    1. Открываем f.txt
            ↓
    2. Создаём readStream
            ↓
    3. Создаём f_copy.txt
            ↓
    4. Создаём writeStream
            ↓
    5. pipe() передаёт данные
            ↓
    6. readStream читает chunk
            ↓
    7. writeStream записывает chunk
            ↓
    8. Повторяется до конца файла
            ↓
    9. writeStream закрывается
            ↓
    10. Срабатывает close
            ↓
    File copied successfully.

    Почему вообще нужен pipe()?

    Без pipe() пришлось бы писать примерно так:

    readStream.on('data', (chunk) => {
        writeStream.write(chunk);
    });

    readStream.on('end', () => {
        writeStream.end();
    });

    А с pipe():

    readStream.pipe(writeStream);

    одна строка делает практически всю эту работу.

    Ещё небольшой момент: если ты хочешь сказать именно «все данные успешно записаны», обычно лучше слушать событие finish:

    writeStream.on('finish', () => {
        console.log('File copied successfully.');
    });

    finish означает, что все данные были переданы в writable stream, а close — что сам файловый ресурс уже закрыт.

    Главное, что стоит запомнить:

    createReadStream()   → откуда читаем
    createWriteStream()  → куда записываем
    pipe()               → соединяем два потока

    То есть твой код по сути означает:

    f.txt.pipe(f_copy.txt);

    концептуально: «бери данные из f.txt кусками и сразу записывай их в f_copy.txt».
*/
