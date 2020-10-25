'use strict'

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let toDoData = [
    
];

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    toDoData.forEach(item => {
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
        
        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(){
            li.remove()
        });

    });
};

todoControl.addEventListener('submit', function(event){
    event.preventDefault();

    if (headerInput.value !== ''){
        const newToDo = {
            value: headerInput.value,
            completed: false
        };
        toDoData.push(newToDo);

        localStorage.setItem('listItem', JSON.stringify(toDoData));
    }
    
    headerInput.value = '';
    render();
});



render();

let showList = function(){
    let data = JSON.parse(localStorage.getItem('listItem'));
    console.log(data);
    console.log(typeof data);
    
    data.forEach(function(item) {
        console.log(item);
        //todoCompleted.textContent(item)
    });
}

showList();