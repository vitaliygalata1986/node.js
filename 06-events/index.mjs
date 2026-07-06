import EventEmitter from 'events';

const myEmmitter = new EventEmitter();

const timeoutListenerFn = (secondsQty) => {
  console.log(`Timeout event in ${secondsQty} secondsQty!`);
};

myEmmitter.on('timeout', timeoutListenerFn);

setTimeout(() => myEmmitter.emit('timeout', 1), 1000);
setTimeout(() => myEmmitter.emit('timeout', 2), 2000);

// отключаем слушателя для события timeout
setTimeout(() => {
  myEmmitter.off('timeout', timeoutListenerFn);
}, 3000);

// remove listener from the timeout event
setTimeout(() => myEmmitter.emit('timeout', 4), 4000);
