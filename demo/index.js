const { Todo, List } = require('isomorphic-library');

const shoppingList = new List('Countdown');

shoppingList.todos.push(new Todo('Potatos'));
shoppingList.todos.push(new Todo('Bread'));
shoppingList.todos.push(new Todo('Beef'));
shoppingList.todos.push(new Todo('Eggs'));

console.log('Shopping list: ');
shoppingList.todos.forEach(it => console.log(`[ ] ${it.title}`));

