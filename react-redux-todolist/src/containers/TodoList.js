import React from 'react';
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import actions from '../actions/TodoList'
import components from '../components/TodoList'
import reducers from '../reducers/TodoList'

const AddToDoContainer = connect(null,
    { onAddToDo: actions.addToDo }
)(components.AddToDo);

const ShowToDosContainer = connect(state => { return { toDos: getVisibleTodos(state.toDos, state.filter) } },
    { onClick: actions.toggleTodo }
)(components.ShowToDos);

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'All':
            return todos
        case 'Active':
            return todos.filter(t => !t.completed)
        case 'Complete':
            return todos.filter(t => t.completed)
        default:
            return todos
    }
}

const FooterContainer = connect(state => { return { selectedFilter: state.filter } },
    { onFilterChange: actions.changeFilter }
)(components.Footer);

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

let store = createStore(combineReducers(reducers), applyMiddleware(logger));

export default <Provider store={store}>
    <div><AddToDoContainer /><ShowToDosContainer /><FooterContainer /></div>
</Provider>