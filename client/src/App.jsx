import { useState, useEffect } from 'react';
import axios from 'axios';
import InputTodo from './components/InputTodo/InputTodo';
import Todo from './components/Todo/Todo';
import './App.scss';

function App() {
  const [todos, setTodos] = useState([]);
  const [list, setList] = useState('pending');
  const [reloadListener, setReloadListener] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5050/todos/${list}`)
      .then(res => {
        setTodos(res.data);
      })
      .catch(error => console.log(error));

      console.log('useEffect runned');
  }, [reloadListener, list])

  return (
    <div className='app'>
      <InputTodo 
        reloadListener={reloadListener} 
        setReloadListener={setReloadListener}
      />
      <ul>
        <div className='list-menu'>
          <p onClick={() => setList('pending')} >Pending Tasks</p>
          <p onClick={() => setList('finished')} >Finished Tasks</p>
        </div>
        {todos.map((todo) => 
          <Todo 
            {...todo}
            reloadListener={reloadListener}
            setReloadListener={setReloadListener}
          />
        )}
      </ul>
    </div>
  );
}

export default App;
