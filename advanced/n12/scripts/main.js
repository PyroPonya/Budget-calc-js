'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed'),
  todoRemove = document.getElementsByClassName('todo-remove'),
  todoItems = document.getElementsByClassName('todo-item');
  
  const getLocalSave = () => {
    return JSON.parse(localStorage.getItem('todoDataSave'));
  };

  const todoData = getLocalSave();
  
  const setLocalSave = () => {
    return localStorage.setItem('todoDataSave', JSON.stringify(todoData));
  };

const todoRemoveFn = () => {
  if (todoItems.length > 0) {
    for (let el of todoItems) {
      el.removeEventListener('click', this);
      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('todo-remove')) {
          todoData.forEach((item) => {
            if (item.value === el.innerText) {
              todoData.splice(todoData.indexOf(item), 1);
              render();
            }
          });
        }
      });
    }
  }
};


const render = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="text-todo">${item.value}</span>
    <div class="todo-buttons">
    <button class="todo-remove"></button>
    <button class="todo-complete"></button>
    </div>`;
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    const btnTodoCompleted = li.querySelector('.todo-complete');
    btnTodoCompleted.addEventListener('click', () => {
      item.completed = !item.completed;
      render();
    });
  });
  todoRemoveFn();
  setLocalSave();
};

todoControl.addEventListener('submit', (e) => {
  e.preventDefault();
  if (headerInput.value !== '') {
    const newToDo = {
      value: headerInput.value,
      completed: false,
    };
    todoData.push(newToDo);
    todoControl.reset();
  }
  render();
});
render();
