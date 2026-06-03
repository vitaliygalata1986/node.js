console.log(arguments.callee.toString());
console.log('Bogdan');
console.log(module);
console.log(__filename); // /var/www/node_loc./03-commonjs-modules/other.js - абсолютный путь к файлу
console.log(__dirname); // /var/www/node_loc./03-commonjs-modules - абсолютный путь к папке
console.log(exports); // {} - объект, который будет экспортирован из модуля.
console.log(require.extensions); // { '.js': [Function], '.json': [Function], '.node': [Function] } - объект, который содержит функции для загрузки модулей с различными расширениями.
