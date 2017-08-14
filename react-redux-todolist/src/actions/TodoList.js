function addToDo() {
    let newTodoText = document.getElementById('newTodoInput').value;
    document.getElementById('newTodoInput').value = '';
    return { type: 'ADD_TO_DO', text: newTodoText };
}
function toggleTodo(id) {
    return { type: 'TOGGLE_TO_DO', id: id };
}

function changeFilter(filter) {
    return { type: 'CHANGE_FILTER', filter: filter };
}

export default { addToDo, toggleTodo, changeFilter }