'use strict'

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

function createItem(item){
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' + 
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' + 
        '</div>';

    checkItem(item, li)
    return li
};

function checkItem(item, li){
    if(item.completed){
        todoCompleted.append(li)
    } else{
        todoList.append(li);
    }
    return li
}


const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = '';

    toDoData.forEach(item => {
        const li = createItem(item);
        
        const btnTodoCompleted = li.querySelector('.todo-complete');
        btnTodoCompleted.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function(){
            li.remove();
            for( let i = 0; i < toDoData.length; i++){ 
                if ( toDoData[i] === item) { 
                    toDoData.splice(i, 1); 
            }}
        });

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
    }
    headerInput.value = '';


});

let showList = function(){
    let data = JSON.parse(localStorage.getItem('listItem'));

    

    data.forEach(item => {

        const li = createItem(item);
        checkItem(item, li);

        // const li = createItem(item);
        
        // const btnTodoCompleted = li.querySelector('.todo-complete');
        // btnTodoCompleted.addEventListener('click', function(){
        //     item.completed = !item.completed;
        //     //render();
        // });

        // const btnTodoRemove = li.querySelector('.todo-remove');
        // btnTodoRemove.addEventListener('click', function(){
        //     li.remove();
        //     for( let i = 0; i < toDoData.length; i++){ 
        //         if ( toDoData[i] === item) { 
        //             toDoData.splice(i, 1); 
        //     }}
        // });
    });
    
}

showList();
render();