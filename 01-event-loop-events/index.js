const fs = require('fs');
const dns = require('dns');

console.log('Program start');

function timeStamp() {
  return performance.now().toFixed(2);
}

// Timeouts
setTimeout(() => {
  console.log('Timeout 1', timeStamp());
}, 0);

setTimeout(() => {
  process.nextTick(() => {
    console.log('Next tick Two', timeStamp());
  });
  console.log('Timeout 2', timeStamp());
}, 100);

// Close events
fs.writeFile('./test.txt', 'Hello, World!', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully', timeStamp());
});

// Promises
Promise.resolve().then(() => {
  console.log('Promise 1', timeStamp());
});

// Next ticks
process.nextTick(() => {
  console.log('Next tick One', timeStamp());
});

// setImmediate (Check)
setImmediate(() => {
  console.log('Immediate 1', timeStamp());
});

// Intervals
let intervalCount = 0;
const intervalId = setInterval(() => {
  console.log(`Interval ${(intervalCount += 1)}`, timeStamp());
  if (intervalCount === 2) clearInterval(intervalId);
}, 50);

// I/O Events
dns.lookup('localhost', (err, address, family) => {
  if (err) {
    console.error('DNS lookup error:', err);
    return;
  }
  console.log('DNS lookup result:', address, family, timeStamp());
  Promise.resolve().then(() => console.log('Promise 2', timeStamp()));
  process.nextTick(() => console.log('Next tick Three', timeStamp()));
});

console.log('Program end');

/*
  Логика такая:

  1. Сначала выполняется синхронный код:
     - console.log('Program start')
     - регистрируются setTimeout, setImmediate, setInterval, fs.writeFile, dns.lookup
     - создаются Promise и process.nextTick
     - console.log('Program end')

  2. После завершения синхронного кода Node.js сначала выполняет process.nextTick:
     - Next tick One

  3. Потом выполняются Promise microtasks:
     - Promise 1

  4. Затем Event Loop переходит к macrotasks.

  Примерный порядок вывода будет такой:

    Program start
    Program end
    Next tick One
    Promise 1
    Timeout 1
    DNS lookup result: ...
    Next tick Three
    Promise 2
    Immediate 1
    File written successfully
    Interval 1
    Timeout 2
    Next tick Two
    Interval 2

  Важно:

  - process.nextTick имеет самый высокий приоритет после завершения текущего синхронного кода.
  - Promise.then выполняется после nextTick, но тоже до обычных callback'ов Event Loop.
  - setTimeout(..., 0) попадает в timers phase.
  - setImmediate попадает в check phase.
  - dns.lookup и fs.writeFile являются I/O callback'ами, поэтому их точный порядок может немного отличаться.
  - setInterval срабатывает каждые 50ms, пока его не остановят через clearInterval.
  - Внутри callback'а setTimeout 2 сначала регистрируется process.nextTick,
    потом выполняется console.log('Timeout 2').
    После завершения callback'а Node.js сразу очищает очередь nextTick,
    поэтому выводится 'Next tick Two'.

  То есть:

    Запустился callback setTimeout 2
    ↓
    Внутри него добавился process.nextTick
    ↓
    Выполнился console.log('Timeout 2')
    ↓
    Callback завершился
    ↓
    Node.js проверил очередь nextTick
    ↓
    Выполнился console.log('Next tick Two')
*/
