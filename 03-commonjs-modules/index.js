console.log(arguments.callee.toString());
console.log('Bogdan');

/*
    function (exports, require, module, __filename, __dirname) {
        console.log(arguments.callee.toString()); // [Function (anonymous)]
        console.log('Bogdan')
    }
*/

// тоесть мы видим, как выглядит функция, которая оборачивает весь наш код в модуле.
// И мы видим, что она принимает 5 аргументов: exports, require, module, __filename и __dirname.
// Эти аргументы доступны внутри нашего модуля и позволяют нам работать с экспортами, импортами и информацией о файлах.
