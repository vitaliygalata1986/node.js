const { myName, myHobbies, myFavoriteNumber } = require('./multiple-exports');
const { myGreatHobbies } = require('./export-and-import');
// попробуем изменить массив myHobbies

myHobbies.push('boxing');

console.log(myGreatHobbies); // [ 'coding', 'gaming', 'traveling', 'boxing' ] -
//  мы видим, что myGreatHobbies тоже изменился, так как он ссылается на тот же массив, что и myHobbies
