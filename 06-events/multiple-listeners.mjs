import { EventEmitter } from 'events';

const myEmmitter = new EventEmitter();

myEmmitter.on('myEvent', () => {
  console.log('First event listener');
});

myEmmitter.on('myEvent', () => {
  console.log('Second event listener');
});

setTimeout(() => myEmmitter.emit('myEvent'), 1000);

// но если нужно увелить максимальное количество слушателей, то можно использовать myEmmitter.setMaxListeners(100);
myEmmitter.setMaxListeners(25);

console.log(myEmmitter.getMaxListeners()); // 10 - это максимальное количество слушателей для одного события

myEmmitter.on('otherEvent', () => {
  console.log('Other event');
});

// можно посмотреть список событий зарегистрированных в данном экземпляре myEmmitter
console.log(myEmmitter.eventNames()); // [ 'myEvent', 'otherEvent' ] - список событий

setTimeout(() => myEmmitter.emit('otherEvent'), 1000);
