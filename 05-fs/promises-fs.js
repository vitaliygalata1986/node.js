const fs = require('fs/promises'); // use commonjs module system to import the fs module

fs.writeFile('./first.txt', 'First file text')
    .then(() => console.log('File first.txt was written successfully'))
    .then(() => fs.appendFile('./first.txt', '\nAppended text'))
    .then(() => console.log('File first.txt was appended successfully'))
    .then(() => fs.rename('./first.txt', './renamed.txt'))
    .then(() => console.log('File first.txt was renamed to renamed.txt successfully'))
    .catch((err) => console.error(err))


// writeFile, appendFile, rename возвращают промис - благодаря эту мы можем соединять промисы в цепочку с помощью then и catch.




