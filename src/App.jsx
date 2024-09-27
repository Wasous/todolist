import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import './styles.css'; // Importa los estilos aquí

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Cargar las tareas desde el backend al montar el componente
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error al cargar las tareas:', error));
  }, []);

  const handleTodoAdded = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="App">
      <h1>Aplicación CRUD de Tareas</h1>
      <AddTodoForm onTodoAdded={handleTodoAdded} />
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
