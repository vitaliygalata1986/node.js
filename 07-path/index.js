const path = require('path');

const filePath = '/home/vitaliy_galata/Документы/react.txt';

const textFilePath = '/home/vitaliy_galata/Рабочий стол/react.txt';

const relativePath = './node/mobie.mov';

const directoryPath = './node/subFolder';

const isAbsolute = path.isAbsolute(filePath); // абсолютный путь или относительный

// console.log(isAbsolute); // true

// console.log(path.isAbsolute(relativePath)); // false

// console.log(path.basename(filePath)); // react.txt

// console.log(path.basename(directoryPath)); // subFolder

// basename - возвращает имя последнего элемента пути

// console.log(path.dirname(filePath)); // /home/vitaliy_galata/Документы

// dirname - возвращщает путь без названия файла

// console.log(path.dirname(relativePath)); // ./node

// метод resolve - для получения абсолютного пути

console.log(path.resolve(directoryPath)); // /var/www/node_loc./node/subFolder

// получим расширение файла исходя из пути

console.log(path.extname(textFilePath)); // .txt

console.log(path.extname(directoryPath)); // пустоя строка

// распарсим на части опред. путь

console.log(path.parse(textFilePath));
/*
    {
        root: '/',
        dir: '/home/vitaliy_galata/Рабочий стол',
        base: 'react.txt',
        ext: '.txt',
        name: 'react'
    }
*/

const parsedPath = path.parse(textFilePath);
console.log(parsedPath.name);
console.log(path.join(parsedPath.dir, `renamed-${parsedPath.name}.mjs`));
