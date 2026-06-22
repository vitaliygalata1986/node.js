const fs = require('fs'); // use commonjs module system to import the fs module

fs.writeFile(
    './first.txt', 'First file text', (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('File first.txt was written successfully');
    
        // дописати текст у файл first.txt
        fs.appendFile('./first.txt', '\nAppended text', (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('File first.txt was appended successfully');
                
                // перейменувати файл first.txt на renamed.txt
                fs.rename('./first.txt', './renamed.txt', (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('File first.txt was renamed to renamed.txt successfully');
                    }
                });
            }
        });
    }
});

