const pool = require('../config/database');

async function createTodo(req, res){
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description, is_completed) VALUES ($1, false) RETURNING *', 
            [description]
        );

        res.send('Todo added successfully');
    } catch (error) {
        res.send(error);
    }
}

async function getAllTodos(req, res){
    try {
        const { isCompleted } = req.query;
        let query = 'SELECT * FROM todo ';

        if(isCompleted === 'true'){
            query += 'WHERE is_completed = true ORDER BY todo_id DESC';
        } else if (isCompleted === 'false'){
            query += 'WHERE is_completed = false ORDER BY todo_id DESC';  
        } else {
            query += 'ORDER BY todo_id DESC';
        }

        todos = await pool.query(query);
        res.send(todos.rows);
    } catch (error) {
        res.send(error);
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

async function updateTodoDescription(req, res){
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodoDescription = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2',
            [description, id]
        );

        res.send('Todo was updated successfully');
    } catch (error) {
        res.send(error);
    }
}

async function updateTodoStatus(req, res){
    try {
        const {id} = req.params;
        const {is_completed} = req.body;
        const updateTodoStatus = await pool.query(
            'UPDATE todo SET is_completed = $1 WHERE todo_id = $2',
            [is_completed, id]
        )

        res.send('Todo Status updated successfully');
    } catch (error) {
        res.send(error);
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
        res.send(error);
    }
}

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodoDescription,
    updateTodoStatus,
    deleteTodo
};