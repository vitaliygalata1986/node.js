const fs = require('fs'); // встроенный модуль для работы с файловой системой

console.log('Program start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

setTimeout(() => {
  console.log('Timeout 2');
}, 10);

// ./ - относительно текущей директории, test.txt - имя файла, 'Hello, World!' - содержимое файла
fs.writeFile('./test.txt', 'Hello, World!', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully');
});

Promise.resolve().then(() => {
  console.log('Promise 1');
});

console.log('Program end');

// итак, почему мы видим резульат консоли запись файл после всех синхронных операций, но до выполнения setTimeout и Promise?

// Ответ заключается в том, что операции ввода-вывода (I/O), такие как запись в файл, обрабатываются в отдельной очереди событий, которая называется "I/O queue". Когда мы вызываем fs.writeFile, Node.js отправляет эту операцию в I/O очередь и продолжает выполнение синхронного кода.

// Сначала выполняются все синхронные операции, такие как console.log('Program start') и console.log('Program end'). Затем, когда синхронный код завершен, Node.js обрабатывает события в очереди событий.

/*
setTimeout(..., 0). Он всё равно откладывает callback в очередь timers phase event loop. Просто задержка 0 означает: “выполни как можно раньше после завершения текущего синхронного кода и microtasks”.
*/

/*
  Program start
  Program end
  Promise 1
  Timeout 1
  File written successfully
  Timeout 2
*/

// В твоём коде порядок примерно такой:
/*
console.log('Program start'); // sync

setTimeout(..., 0);  // callback уходит в timers queue
setTimeout(..., 10); // callback уходит в timers queue с задержкой

fs.writeFile(...);   // async I/O операция, callback будет позже в poll phase

Promise.resolve().then(...); // microtask

console.log('Program end'); // sync

После завершения синхронного кода Node.js сначала выполняет microtasks, то есть:

Promise 1

Потом уже event loop переходит к фазам. Обычно будет так:

Program start
Program end
Promise 1
Timeout 1
File written successfully
Timeout 2

Итог: setTimeout с нулём - просто планируется на ближайший проход event loop после синхронного кода и после Promise microtasks.
*/
