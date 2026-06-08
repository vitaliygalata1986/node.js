// здесь добавим только один экспорт, тоесть мы перезапишем module.exports

function greeting(name) {
  console.log(`Hello, ${name}`);
}

// console.log(__filename); // получим путь к текущему файлу (абсолютный путь)

module.exports = greeting;
