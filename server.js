const express = require('express')
const path = require('path');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const pool = require('./config/db')




const app = express();

const PORT = 3002;

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));


//routes
//create todo
app.post('/todos', async(req, res)=>{
    try {
        const {description} = req.body;
        const newTodo =  await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description])
        res.json(newTodo.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})


//get all todos
app.get('/todos', async (req, res)=>{
    try {
        const allTodos = await pool.query('SELECT * FROM todo')
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})


//get a todo
app.get('/todos/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
        res.json(todo.rows)
    } catch (error) {
        console.error(error.message)
    }
})


//update a todo
app.put('/todos/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const {description} = req.body
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id])
        res.json("Todo was updated!")
    } catch (error) {
        console.error(error.message)
    }
})


//delete a todo
app.delete('/todos/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])
        res.json("Todo was deleted!")
    } catch (error) {
        console.error(error.message)
    }
})





app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`running on ${PORT}`);
});