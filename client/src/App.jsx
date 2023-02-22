import { useState, useEffect } from 'react';
import axios from 'axios';
import InputTodo from './components/InputTodo/InputTodo';
import Todo from './components/Todo/Todo';
import './App.scss';

function App() {
  const [todos, setTodos] = useState([]);
  
  async function getTodos(){
    try {
      await axios.get('http://localhost:5050/todos')
        .then(res => {
          setTodos(res.data);
        });
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getTodos();
  }, [])

  return (
    <div className='app'>
      <h1>PERN stack Todo List</h1>
      <InputTodo />
      <ul>
        {todos.map((todo) => 
          <Todo 
            key={todo.todo_id}
            todo_id={todo.todo_id}
            description={todo.description}
          />
        )}
      </ul>
    </div>
  );
}

export default App;
