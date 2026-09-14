import stream from 'stream';
import fs from 'fs';

// console.log(process);

// process.stdin.pipe(process.stdout); // возвращает поток ввода (ReadableStream) тоесть всё что мы вводим в терминале, будет попадать в этот поток, а затем мы его перенаправляем в поток вывода (WritableStream) и всё что мы вводим в терминале, будет выводиться обратно в терминал.

// process.stdin.pipe(process.stderr); // возвращает поток ввода (ReadableStream) тоесть всё что мы вводим в терминале, будет попадать в этот поток, а затем мы его перенаправляем в поток ошибок (WritableStream) и всё что мы вводим в терминале, будет выводиться обратно в терминал как ошибка.

/*
    console.log(process) выводит большой глобальный объект Node.js process. В нём находится информация о текущем запущенном Node-процессе и методы для управления им.

    На твоём скриншоте, например:

    console.log(process);

    показывает такие вещи, как:

    cwd() — текущая рабочая папка программы.
    chdir() — позволяет поменять рабочую папку.

    env — переменные окружения:

    console.log(process.env);
    console.log(process.env.HOME);
    console.log(process.env.PATH);

    На скриншоте видно, например:

    SHELL: '/bin/bash'
    COLORTERM: 'truecolor'

    pid — ID текущего Node-процесса:

    console.log(process.pid);

    platform — ОС:

    console.log(process.platform);
    // linux

    version / versions — версия Node.js и используемых компонентов:

    console.log(process.version);

    argv — аргументы, с которыми запустили программу:

    console.log(process.argv);

    Например, если выполнить:

    node app.mjs hello 25

    то:

    console.log(process.argv);

    примерно выдаст:

    [
    '/usr/bin/node',
    '/var/www/.../app.mjs',
    'hello',
    '25'
    ]

    Но для твоего урока про streams самая важная часть process — это:

    process.stdin
    process.stdout
    process.stderr

    Это три стандартных потока:

    stdin   → данные в программу
    stdout  → обычные данные из программы
    stderr  → ошибки из программы
*/

// перенаправим поток в файл, вместо того чтобы выводить в терминал
const filePath = './files/stdin-dump.txt';
const writableStream = fs.createWriteStream(filePath);
process.stdin.pipe(writableStream); // всё что мы вводим в терминале, будет попадать в поток ввода (ReadableStream) и затем мы его перенаправляем в поток записи в файл (WritableStream) и всё что мы вводим в терминале, будет записываться в файл output.txt.
