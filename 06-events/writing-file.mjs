import { EventEmitter } from 'events';
import fs from 'fs';

const fileEmitter = new EventEmitter();

const filePath = './first.txt';

fileEmitter.on('writeComplete', () => {
  console.log('File first.txt was written successfully');

  fs.appendFile(filePath, '\nAppended text', () => {
    fileEmitter.emit('appendComplete');
  });
});

fileEmitter.on('appendComplete', () => {
  console.log('File first.txt was appended successfully');
  fs.rename(filePath, './renamed.txt', () => {
    fileEmitter.emit('renameComplete');
  });
});

fileEmitter.on('renameComplete', () => {
  console.log('File first.txt was renamed to renamed.txt successfully');
});

fs.writeFile(filePath, 'First file text', () => {
  fileEmitter.emit('writeComplete');
});

// здесь мы зарегестрировали события writeComplete, appendComplete и renameComplete, которые будут вызываться в определенной последовательности.
