import { EventEmitter } from 'events';

const myEmmitter = new EventEmitter();

// on явлется алиасом addListener - добавляет обработчик события

myEmmitter.on('timeout', (secondsQty) => {
  console.log(`Timeout event in ${secondsQty} secondsQty!`); // Timeout event!
});

// myEmmitter.emit('timeout'); // вызов события

setTimeout(() => myEmmitter.emit('timeout', 1), 1000);
setTimeout(() => myEmmitter.emit('timeout', 2), 2000);

// сделаем однократный вызов события используя метод once
myEmmitter.once('singleEvent', () => {
  console.log('Single event occurred!');
});

setTimeout(() => myEmmitter.emit('singleEvent'), 500);
setTimeout(() => myEmmitter.emit('singleEvent'), 1500); // событие не будет вызвано

/*
  Single event occurred!
  Timeout event in 1 secondsQty!
  Timeout event in 2 secondsQty!
*/
