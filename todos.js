let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}


//initial rendering all todos
renderTodos(todos, filters)

//search todos--filter
document.querySelector('#filter-todo').addEventListener('input', function(e){
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
});

//to add todo
document.querySelector('#add-todo').addEventListener('submit', function(e){
    e.preventDefault();
    todos.push({
        id: uuidv4(),
        text: e.target.elements.itemAdded.value,
        completed: false
        
    })
    
    saveTodos(todos);
    e.target.elements.itemAdded.value = ''
    renderTodos(todos, filters);
})

//HIDE COMPLETED

document.querySelector('#hide-completed').addEventListener('change', function(e){
   filters.hideCompleted = e.target.checked;
   renderTodos(todos, filters);
});

