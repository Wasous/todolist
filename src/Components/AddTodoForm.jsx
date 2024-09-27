// AddTodoForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddTodoForm = ({ onTodoAdded }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/todos', { title })
            .then(response => {
                onTodoAdded(response.data);
                setTitle('');
            })
            .catch(error => console.error('Error al añadir la tarea:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nueva tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Añadir</button>
        </form>
    );
};

export default AddTodoForm;

