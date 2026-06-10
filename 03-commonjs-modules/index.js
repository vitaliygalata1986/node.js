const { myName, myHobbies, myFavoriteNumber } = require('./multiple-exports');
const { myGreatHobbies } = require('./export-and-import');
const greeting = require('./my-modules/single-exports');
// попробуем изменить массив myHobbies

const { myName: myGreatName } = require('./export-and-import'); // импортируем переменную myName, которая была экспортирована в export-and-import.js под именем myName, но мы можем импортировать ее под другим именем, например myGreatName

myHobbies.push('boxing');

// console.log(myGreatHobbies); // [ 'coding', 'gaming', 'traveling', 'boxing' ] -
//  мы видим, что myGreatHobbies тоже изменился, так как он ссылается на тот же массив, что и myHobbies

greeting(myName); // Hello, Bogdan
greeting(myGreatName); // Hello, Bogdan
