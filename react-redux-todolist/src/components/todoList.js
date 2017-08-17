import React from 'react';
import './web.css';

const AddToDo = ({ onAddToDo }) => <div><input ref={input => this.newTodoInput = input} /><button onClick={() => onAddToDo(this.newTodoInput)}>Add Todo </button> </div>

const ShowToDos = ({ toDos, onClick }) =>
    <ul>{toDos.map(item => <li key={item.id} className={item.completed ? 'completed' : 'incompleted'} onClick={() => onClick(item.id)}>{item.text}</li>)}</ul>

const Footer = ({ selectedFilter, onFilterChange }) =>
    <div>Show: {['All', 'Active', 'Complete'].map(item => {
        let link = {};
        if (item !== selectedFilter) {
            link = { className: 'filter_link', onClick: () => onFilterChange(item) }
        }
        return <span key={item} {...link}> {item} </span>
    }
    )} </div>


export default { AddToDo, ShowToDos, Footer }