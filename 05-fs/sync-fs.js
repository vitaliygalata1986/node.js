const fs = require('fs'); 

try {
    fs.writeFileSync('./first.txt', 'First file text')
    // так как предыдущая операция синхронная, то следующая будет выполнена только после её завершения
    console.log('File first.txt was written successfully')

    fs.appendFileSync('./first.txt', '\nAppended text')
    console.log('File first.txt was appended successfully')

    fs.renameSync('./first.txt', './renamed.txt')
    console.log('File first.txt was renamed to renamed.txt successfully')

} catch (error) {
    console.error(error)
}


// недостаток такого подхода в том, что все эти операции выполняем в единственном потоке node js, блокируя остальные операции.





