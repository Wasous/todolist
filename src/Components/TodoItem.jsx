import React from 'react';

const TodoItem = ({ todo }) => {
    return (
        <div>
            <h3>{todo.title}</h3>
            <p className='todo-item'>{todo.completed ? 'Completada' : 'Pendiente'}</p>
        </div>
    );
};

export default TodoItem;
