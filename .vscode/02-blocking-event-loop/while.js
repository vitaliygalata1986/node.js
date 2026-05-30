let isRunning = true;

setTimeout(() => (isRunning = false), 10);

process.nextTick(() => console.log('Next tick')); // даже эта функция не будет выполнена, пока while loop не завершится

while (isRunning) {
  console.log('While loop is running...');
}

//  несмотря на то, что setTimeout был вызван, while loop продолжает выполняться, блокируя event loop и не позволяя setTimeout завершиться. Это демонстрирует, как блокирующий код может препятствовать выполнению других задач в JavaScript.
