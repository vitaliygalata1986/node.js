const path = require('path');

const filePath = '/home/vitaliy_galata/Документы/react.txt';

const textFilePath = '/home/vitaliy_galata/Рабочий стол/react.txt';

const relativePath = './node/mobie.mov';

const directoryPath = './node/subFolder';

const isAbsolute = path.isAbsolute(filePath); // абсолютный путь или относительный

console.log(isAbsolute); // true

console.log(path.isAbsolute(relativePath)); // false

console.log(path.basename(filePath)); // react.txt

console.log(path.basename(directoryPath)); // subFolder

// basename - возвращает имя последнего элемента пути

console.log(path.dirname(filePath)); // /home/vitaliy_galata/Документы

// dirname - возвращщает путь без названия файла

console.log(path.dirname(relativePath)); // ./node

// метод resolve - для получения абсолютного пути

console.log(path.resolve(directoryPath)); // /var/www/node_loc./node/subFolder
