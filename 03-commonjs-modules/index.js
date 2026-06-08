const { myName, myHobbies, myFavoriteNumber } = require('./multiple-exports');
const greetingFn = require('./single-exports'); // лучше использовать относительный путь, так как он будет работать везде, а абсолютный путь может не работать на других машинах

// const greetingFn = require('/var/www/node_loc./03-commonjs-modules/single-exports.js');

greetingFn(myName);
