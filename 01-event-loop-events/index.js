const fs = require('fs');
const dns = require('dns');

console.log('Program start');

function info(text) {
  console.log(text, performance.now().toFixed(2));
}

// Timeouts
setTimeout(() => info('File written'), 0);

setTimeout(() => {
  process.nextTick(() => {
    info('Next tick Two');
  });
  info('Timeout 2');
}, 100);

// Close events
fs.writeFile('./test.txt', 'Hello, World!', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  info('File written successfully');
});

// Promises
Promise.resolve().then(() => info('Promise 1'));

// Next ticks
process.nextTick(() => info('Next tick One'));

// setImmediate (Check)
setImmediate(() => info('Immediate 1'));

// Intervals
let intervalCount = 0;
const intervalId = setInterval(() => {
  info(`Interval ${(intervalCount += 1)}`);
  if (intervalCount === 2) clearInterval(intervalId);
}, 50);

// I/O Events
dns.lookup('localhost', (err) => {
  if (err) {
    console.error('DNS lookup error:', err);
    return;
  }
  info('DNS lookup result:');
  Promise.resolve().then(() => info('Promise 2'));
  process.nextTick(() => info('Next tick Three'));
});

console.log('Program end');
