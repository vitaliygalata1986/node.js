import { Transform } from 'stream';
import fs from 'fs';

// создадим трансформационный поток, который будет трансформироватть поток, который в него приходит и далее передавать данные в след. поток

const upperCaseStrem = new Transform({
  transform: function (chunk, encoding, callback) {
    // chunk - это кусок данных, который пришел в поток
    // encoding - кодировка, в которой пришел chunk
    // callback - функция, которую нужно вызвать после того, как мы закончим трансформацию

    // const upperCased = chunk;
    // console.log(upperCased); // это буфер, а не строка
    const upperCased = chunk.toString().toUpperCase(); // преобразуем буфер в строку
    callback(null, upperCased); // вызываем callback, передаем null, чтобы указать, что ошибок нет, и передаем upperCased, чтобы передать данные в след. поток
  },
});

process.stdin.pipe(upperCaseStrem).pipe(process.stdout);
// перенаправим поток данных из stdin в upperCaseStrem, а затем из upperCaseStrem в stdout
// stdin - это поток, который читает данные из стандартного ввода (например, из терминала)
// stdout - это поток, который пишет данные в стандартный вывод (например, в терминал)
// буфер в node js - врменное хранинилище данных в ОП (массив байтов), который используется для работы с потоками данных, так как потоки данных могут быть очень большими и не помещаться в память целиком, поэтому они разбиваются на куски (чанки) и передаются по частям
