const toDoForm = document.getElementById('todo-form');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.getElementById('todo-list');

const TODOS_KEY = 'toDos';

const savedToDos = JSON.parse(localStorage.getItem(TODOS_KEY)) ?? [];

toDoForm.addEventListener('submit', handleToDoSubmit);

if (savedToDos.length !== 0) {
  savedToDos.forEach(paintTodo);
}
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = '';
  const newTodoObj = {
    id: Date.now(),
    text: newTodo,
  }
  savedToDos.push(newTodoObj);
  updateTodos();
  paintTodo(newTodoObj);
}

function paintTodo(newTodoObj) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const button = document.createElement('button');
  span.innerText = newTodoObj.text;
  button.innerText = '❌';
  li.appendChild(span);
  li.appendChild(button);
  button.addEventListener('click', deleteTodo);
  toDoList.appendChild(li);
  li.id = newTodoObj.id;
}

function updateTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(savedToDos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  const id = li.getAttribute('id');
  li.remove();
  const removeIndex = savedToDos.findIndex(e => e.id === +id);
  savedToDos.splice(removeIndex, 1);
  updateTodos();
}