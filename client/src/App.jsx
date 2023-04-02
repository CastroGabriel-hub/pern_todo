import { useReducer, useEffect } from 'react';
import axios from 'axios';
import InputTodo from './components/InputTodo/InputTodo';
import Todo from './components/Todo/Todo';
import {reducer, initialValues} from './hooks/state';
import './App.scss';

function App() {
  const [state, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    axios.get(`http://localhost:5050/todos/${state.list}`)
      .then(res => {
        dispatch({type: 'setTodos', content: res.data});
      })
      .catch(error => console.log(error));
  }, [state.reloadListener, state.list])

  return (
    <div className='app'>
      <InputTodo state={state} dispatch={dispatch} />
      <ul>
        <div className='list-menu'>
          <p onClick={() => dispatch({type: 'setList', content: 'pending'})} >Pending Tasks</p>
          <p onClick={() => dispatch({type: 'setList', content: 'finished'})} >Finished Tasks</p>
        </div>
        {state.todos.map((todo) => 
          <Todo {...todo} state={state} dispatch={dispatch} />
        )}
      </ul>
    </div>
  );
}

export default App;