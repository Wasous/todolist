import React from 'react';
import TodoItem from './TodoItem';


const TodoList = ({ todos, setTodos }) => {
    return (
        <div>
            <h2>Lista de Tareas</h2>
            <ul className="todo-list">
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;