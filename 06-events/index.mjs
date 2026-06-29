import { EventEmitter } from 'events';

const myEmmitter = new EventEmitter();

// on явлется алиасом addListener - добавляет обработчик события

myEmmitter.on('timeout', (secondsQty) => {
  console.log(`Timeout event in ${secondsQty} secondsQty!`); // Timeout event!
});

// myEmmitter.emit('timeout'); // вызов события

setTimeout(() => myEmmitter.emit('timeout', 1), 1000);
setTimeout(() => myEmmitter.emit('timeout', 2), 2000);
