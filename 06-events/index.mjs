import { EventEmitter } from 'events';

const myEmmitter = new EventEmitter();

// on явлется алиасом addListener - добавляет обработчик события

myEmmitter.on('timeout', () => {
  console.log('Timeout event!'); // Timeout event!
});

// myEmmitter.emit('timeout'); // вызов события

setTimeout(() => myEmmitter.emit('timeout'), 1000);
setTimeout(() => myEmmitter.emit('timeout'), 2000);
