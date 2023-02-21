const express = require('express');
const app = express();
const port = 5050;
const cors = require('cors');
const pool = require('./database');

//middleware 
app.use(cors());
app.use(express.json());

//ROUTES//

//Create a Todo
app.post('/todos', async(req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES ($1) RETURNING *', 
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

//get all Todos
app.get('/todos', async(req, res) => {
    try {
        const getAll = await pool.query(
            'SELECT * FROM todo',
        );

        res.send(getAll.rows);
    } catch (error) {
        console.log(erros);
    }
});

//get a Todo

//update a Todo

//delete a Todo

app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})