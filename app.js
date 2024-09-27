import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './config/db.js';
import Todo from './models/Todo.js';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener todas las tareas
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
});

// Ruta para crear una nueva tarea
app.post('/api/todos', async (req, res) => {
    try {
        const { title } = req.body;
        const newTodo = await Todo.create({ title });
        res.json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});

// Ruta para actualizar una tarea
app.put('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        todo.title = title;
        todo.completed = completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
});

// Ruta para eliminar una tarea
app.delete('/api/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        await todo.destroy();
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

// Sincronizar con la base de datos y escuchar en un puerto
sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log('Servidor corriendo en el puerto 5000');
    });
});
