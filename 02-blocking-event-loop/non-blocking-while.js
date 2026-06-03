const fs = require('fs');
let isRunning = true;

// Через 100 мс таймер попадет в фазу timers и поменяет флаг.
// Важно: это случится только тогда, когда JavaScript-стек освободится.
setTimeout(() => (isRunning = false), 100);

// nextTick имеет очень высокий приоритет и будет выполнен
// сразу после завершения текущего синхронного кода.
process.nextTick(() => console.log('Next tick'));

function setImmediatePromise() {
  return new Promise((resolve, reject) => {
    // setImmediate ставит колбэк в фазу check.
    // Когда эта фаза наступит, Promise зарезолвится,
    // а await сможет продолжить выполнение whileLoop.
    setImmediate(() => resolve());
  });
}

async function whileLoop() {
  while (isRunning) {
    console.log('While loop is running...');

    // Ключевой момент:
    // await приостанавливает текущую async-функцию и возвращает управление event loop.
    // Пока whileLoop "на паузе", Node.js может:
    // 1. выполнить process.nextTick(...)
    // 2. выполнить setTimeout(...)
    // 3. обработать другие очереди и I/O
    //
    // После того как setImmediate внутри setImmediatePromise сработает,
    // Promise завершится, и выполнение цикла продолжится со следующей итерации.
    //
    // Поэтому этот while уже не является бесконечной синхронной блокировкой:
    // каждая итерация добровольно "уступает" поток event loop.
    await setImmediatePromise();
  }
}

whileLoop().then(() => console.log('While loop has stopped.'));
