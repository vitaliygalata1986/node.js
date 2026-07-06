import EventEmitter from 'events';

// создадим клас, который будет создавать новый пост

class Post extends EventEmitter {
  // каждый раз, когда будет вызываться метод like для поста
  // мы будет генерировать событие - мы будем на него реагировать
  // путем вывода инфы в консоль
  constructor(author, text) {
    // при создании поста мы будем вызывать конструктор родительского класса EventEmitter
    // в который будем передавать author и text, чтобы они были доступны в экземпляре класса Post
    super(); // вызов конструктора родительского класса EventEmitter
    this.author = author;
    this.text = text;
    this.likesQty = 0; // количество лайков для поста (у вновь созданного поста будет 0 лайков)
  }

  like(username) {
    this.likesQty++;
    // добавим событие (создаем событие likePost), которое будет генерироваться при вызове метода like
    this.emit('likePost', username); // генерируем событие like и передаем количество лайков
  }
}

const myPost = new Post('Vitaliy', 'Hello, this is my first post!');

// добавим слушателя события likePost
myPost.on('likePost', (username) => {
  console.log(`Post liked by ${username}! Total likes: ${myPost.likesQty}`);
});

// console.log(myPost.author);
// console.log(myPost.text);
// console.log(myPost.likesQty);
myPost.like('Alice');

setTimeout(() => {
  myPost.like('Bob');
}, 1000);

setTimeout(() => {
  myPost.like('Charlie');
}, 2000);
// console.log(myPost.likesQty);
