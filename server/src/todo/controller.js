const pool = require('../config/database');

async function createTodo(req, res){
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES ($1) RETURNING *', 
            [description]
        );

        res.send('Todo added successfully');
    } catch (error) {
        console.log(error);
    }
}

async function getAllTodos(req, res){
    try {
        const getAll = await pool.query(
            'SELECT * FROM todo ORDER BY todo_id DESC',
        );

        res.send(getAll.rows);
    } catch (error) {
        consol.log(error);
    }
}

async function getTodoById(req, res){
    try {
        const {id} = req.params;
        const todo = await pool.query(
            'SELECT * FROM todo WHERE todo_id = ($1)',
            [id]
        );

        if(todo.rows == '') {
            res.send('There is no Todo with this Id in our database');
        }else{
            res.send(todo.rows);
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

async function updateTodo(req, res){
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2',
            [description, id]
        );

        res.send('Todo was updated successfully');
    } catch (error) {
        console.log(error);
    }
}

async function deleteTodo(req, res){
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id = $1',
            [id]
        );

        res.send('Todo deleted successfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo
};