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

const reverseStream = new Transform({
  transform(chunk, encoding, callback) {
    const arrayOfChars = chunk.toString().split('');
    const lastChar = arrayOfChars.pop(); // удаляем последний элемент массива, который является символом новой строки и возврашаем его в переменную lastChar
    const reversed = arrayOfChars.reverse().concat(lastChar).join(''); // переворачиваем массив, добавляем в конец массива символ новой строки и объединяем массив в строку
    callback(null, reversed); // вызываем callback, передаем null, чтобы указать, что ошибок нет, и передаем reversed, чтобы передать данные в след. поток
  },
});

process.stdin.pipe(upperCaseStrem).pipe(reverseStream).pipe(process.stdout);
// перенаправим поток данных из stdin в upperCaseStrem, а затем из upperCaseStrem в stdout
// stdin - это поток, который читает данные из стандартного ввода (например, из терминала)
// stdout - это поток, который пишет данные в стандартный вывод (например, в терминал)
// буфер в node js - врменное хранинилище данных в ОП (массив байтов), который используется для работы с потоками данных, так как потоки данных могут быть очень большими и не помещаться в память целиком, поэтому они разбиваются на куски (чанки) и передаются по частям

/*
    Возьмём то, что реально происходит. Ты вводишь:

    hello

    Когда нажимаешь Enter, в поток обычно приходит примерно:

    "hello\n"

    После:

    const arrayOfChars = chunk.toString().split('');

    получаем:

    ['h', 'e', 'l', 'l', 'o', '\n']

    Теперь:

    const lastChar = arrayOfChars.pop();

    pop() делает две вещи: удаляет последний элемент из массива и возвращает его.

    Поэтому теперь:

    arrayOfChars
    // ['h', 'e', 'l', 'l', 'o']

    lastChar
    // '\n'

    То есть lastChar — действительно не массив. Это обычная строка длины 1:

    typeof lastChar
    // "string"

    Дальше:

    arrayOfChars.reverse()

    получаем:

    ['o', 'l', 'l', 'e', 'h']

    А теперь самое важное:

    arrayOfChars.reverse().concat(lastChar)

    Это эквивалентно:

    ['o', 'l', 'l', 'e', 'h'].concat('\n')

    И результат:

    ['o', 'l', 'l', 'e', 'h', '\n']

    Потому что concat() говорит: «Мне дали не массив? Окей, просто добавлю это значение как один новый элемент».

    Затем:

    .join('')

    превращает массив обратно в строку:

    "olleh\n"

    Поэтому терминал выводит:

    olleh

    и курсор оказывается на следующей строке.

    То есть вот эта строка:

    const reversed = arrayOfChars.reverse().concat(lastChar).join('');

    может мысленно читаться так:

    const reversedArray = arrayOfChars.reverse();
    // ['o', 'l', 'l', 'e', 'h']

    const withNewLine = reversedArray.concat(lastChar);
    // ['o', 'l', 'l', 'e', 'h', '\n']

    const reversed = withNewLine.join('');
    // "olleh\n"

    И '\n' — это не «пустая каретка». Это реальный невидимый символ в строке — newline. Например:

    console.log('hello\nworld');

    даст:

    hello
    world

    Именно ради этого .pop() здесь нужен. Если сделать просто:

    chunk.toString().split('').reverse().join('')

    то:

    "hello\n"

    превратится в:

    "\nolleh"

    и сначала произойдёт перенос строки, а уже потом напечатается olleh.
*/
