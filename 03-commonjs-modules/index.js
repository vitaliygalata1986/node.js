const { myName, myHobbies, myFavoriteNumber } = require('./multiple-exports');
const greetingFn = require('./single-exports');
const {
  // использование : - для переименования при импорте
  myName: myOtherName,
  myFriendsName: myOtherFriendsName,
} = require('./export-and-import');
greetingFn(myName);

console.log(myOtherName);
console.log(myOtherFriendsName);
