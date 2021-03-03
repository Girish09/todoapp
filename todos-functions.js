//fetch existing todos from local stroage
const getSavedTodos = ()=>{
    const todosJSON = localStorage.getItem('todos')
    try {
        return todosJSON ? JSON.parse(todosJSON) : [];
    } catch (e) {
        return [];
    }
}
//save todos to local storage
const saveTodos = (todos)=>{
    localStorage.setItem('todos', JSON.stringify(todos));
}
//remove todo 
const removeTodo = (id)=>{
    const index = todos.findIndex((todo) => todo.id === id);
    if (index > -1){
        todos.splice(index, 1);
    }
}
//toggle todos
const toggleTodo = (id)=>{
    const todo = todos.find((todo)=>todo.id === id);

    if (todo){
        todo.completed = !todo.completed
    }
}
//render application todos based on filters
const renderTodos = (todos, filters)=>{
    let filteredTodos = todos.filter((todo)=> todo.text.includes(filters.searchText));
    
    filteredTodos = filteredTodos.filter((todo)=>{
        if (filters.hideCompleted === true){
                return !todo.completed
        } else {
            return true;
        }
    });
  
    // incomplete todos -- for length
    let incompletTodos = filteredTodos.filter((todo)=>!todo.completed);
    
    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompletTodos));    
    
    if (filteredTodos.length>0){
        filteredTodos.forEach((todo)=>{
            document.querySelector('#todos').appendChild(generateTodoDOM(todo));
            
        }); 
    } else {
       const messageEl = document.createElement('p');
       messageEl.classList.add('empty-message');
       messageEl.textContent = 'No to-dos to show';
       document.querySelector('#todos').appendChild(messageEl);
    }
      
}

//Get the DOM elements for an individual note
const generateTodoDOM = (todo)=>{
    const todoDiv = document.createElement('label');
    const containerEl = document.createElement('div');
    const checkBox = document.createElement('input');
    const todoPara = document.createElement('span');
    const removeButton = document.createElement('button');
    
    //setup todo checkbox
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = todo.completed;
    containerEl.appendChild(checkBox);
    checkBox.addEventListener('change', (e)=>{
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })
    //setup todo text
    todoPara.textContent= todo.text;
    containerEl.appendChild(todoPara);
    
    //setup container
    todoDiv.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoDiv.appendChild(containerEl);

    //setup remove removeButton
    removeButton.textContent = "Remove";
    removeButton.classList.add('button', 'button--text');
    todoDiv.appendChild(removeButton)
    removeButton.addEventListener('click', ()=>{
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters)
    });
    
    return todoDiv
}

//get the DOM elements for list summary
const generateSummaryDOM = (incompletTodos)=>{
    const summaryPara = document.createElement('h3');
    summaryPara.classList.add('list-title');
    if (incompletTodos.length>1){
        summaryPara.textContent = `You have ${incompletTodos.length} todos left!`;
    } else {
        summaryPara.textContent = `You have ${incompletTodos.length} todo left!`;
    }
    
    return summaryPara;
}
