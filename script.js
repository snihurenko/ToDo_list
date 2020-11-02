'use strict'

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let toDoData = localStorage.getItem('listItem') ? JSON.parse(localStorage.getItem('listItem')) : [];

function createItemView(item){
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' + 
        '</div>';

    if(item.completed){
        todoCompleted.append(li)
    } else{
        todoList.append(li);
    }
    return li
};

const clearItemsList = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';
};

const render = function(){
    if (toDoData){
        toDoData.forEach(item => {
            createItem(item);
        });
    }
};

const createItem = function(item){
    const li = createItemView(item);
        const btnTodoCompleted = li.querySelector('.todo-complete');
            btnTodoCompleted.addEventListener('click', function(){
                item.completed = !item.completed;
                clearItemsList();
                render();
                localStorage.setItem('listItem', JSON.stringify(toDoData));
        });
    
        const btnTodoRemove = li.querySelector('.todo-remove');
            btnTodoRemove.addEventListener('click', function(){
                li.remove();
                for( let i = 0; i < toDoData.length; i++){ 
                    if ( toDoData[i] === item) { 
                        toDoData.splice(i, 1); 
                }};
            localStorage.setItem('listItem', JSON.stringify(toDoData));
        });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    if (headerInput.value.trim() !== ''){
        const newToDo = {
            value: headerInput.value,
            completed: false
        };
        toDoData.push(newToDo);
        localStorage.setItem('listItem', JSON.stringify(toDoData));
        createItem(newToDo);
    }
    
    headerInput.value = '';
});

render();

