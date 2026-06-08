const myName = 'Bogdan';
const myHobbies = ['coding', 'gaming', 'traveling'];
const myFavoriteNumber = 77;

console.log('Text from the multiple-export CommonJS module');

module.exports.myName = myName;
exports.myHobbies = myHobbies;
module.exports.myFavoriteNumber = myFavoriteNumber;
