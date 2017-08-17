import React from 'react';
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import actions from '../actions/todoList'
import components from '../components/todoList'
import reducers from '../reducers/todoList'

const AddToDoContainer = connect(null,
    { onAddToDo: actions.addToDo }
)(components.AddToDo);

const ShowToDosContainer = connect(state => ({ toDos: getVisibleTodos(state.toDos, state.filter)}),
    { onClick: actions.toggleTodo }
)(components.ShowToDos);

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
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