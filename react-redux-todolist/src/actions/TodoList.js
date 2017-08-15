import * as types from "../constants/actionType";
function addToDo() {
    let newTodoText = document.getElementById('newTodoInput').value;
    document.getElementById('newTodoInput').value = '';
    return { type: types.ADD_TO_DO, text: newTodoText };
}
function toggleTodo(id) {
    return { type: types.TOGGLE_TO_DO, id: id };
}

function changeFilter(filter) {
    return { type: types.CHANGE_FILTER, filter: filter };
}

export default { addToDo, toggleTodo, changeFilter }