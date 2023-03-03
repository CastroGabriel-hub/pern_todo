import { useState, useEffect } from 'react';
import axios from 'axios';
import InputTodo from './components/InputTodo/InputTodo';
import Todo from './components/Todo/Todo';
import './App.scss';

function App() {
  const [todos, setTodos] = useState([]);
  const [reloadListener, setReloadListener] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5050/todos')
      .then(res => {
        setTodos(res.data);
      })
      .catch(error => console.log(error));
  }, [reloadListener])

  return (
    <div className='app'>
      <h1>PERN stack Todo List</h1>
      <InputTodo 
        reloadListener={reloadListener} 
        setReloadListener={setReloadListener}
      />
      <ul>
        {todos.map((todo) => 
          <Todo 
            key={todo.todo_id}
            todo_id={todo.todo_id}
            description={todo.description}
            reloadListener={reloadListener}
            setReloadListener={setReloadListener}
          />
        )}
      </ul>
    </div>
  );
}

export default App;
