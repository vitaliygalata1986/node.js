const { myName, myHobbies } = require('./multiple-exports');

const myFriendsName = 'Alice';

module.exports.myName = myName;
module.exports.myFriendsName = myFriendsName;

// property names could be different from variable names
module.exports.myGreatHobbies = myHobbies;
