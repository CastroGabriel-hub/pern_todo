const express = require('express');
const app = express();
const port = 5050;
const cors = require('cors');
const pool = require('./src/config/database');
const todoRoutes = require('./src/todo/routes');

//middleware 
app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})