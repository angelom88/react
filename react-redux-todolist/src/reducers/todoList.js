import * as types from "../constants/actionType";
const toDos = (state = [], action) => {
    switch (action.type) {
        case types.ADD_TO_DO:
            return [...state, { text: action.text, completed: false, id: state.length + 1 }];
        case types.TOGGLE_TO_DO:
            return state.map(todo => todo.id !== action.id ? todo : { ...todo, completed: !todo.completed });
        default:
            return state;
    }
}

const filter = (state = 'All', { type, filter }) => {
    switch (type) {
        case types.CHANGE_FILTER:
            return filter;
        default:
            return state;
    }
}

export default { toDos, filter }