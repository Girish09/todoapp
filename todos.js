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
    const text = e.target.elements.itemAdded.value.trim();
    e.preventDefault();
    if (text.length>0){
        todos.push({
            id: uuidv4(),
            text: text,
            completed: false
          })
        
        saveTodos(todos);
        e.target.elements.itemAdded.value = ''
        renderTodos(todos, filters);
    }
})

//HIDE COMPLETED

document.querySelector('#hide-completed').addEventListener('change', function(e){
   filters.hideCompleted = e.target.checked;
   renderTodos(todos, filters);
});

