import { useReducer, useEffect } from 'react';
import axios from 'axios';
import InputTodo from './components/InputTodo/InputTodo';
import Todo from './components/Todo/Todo';
import './App.scss';

function reducer(state, action){
  switch (action.type){
    case 'setTodos':
      return {...state, todos: action.content};
    case 'setList':
      return {...state, list: action.content};
    case 'reloadPage':
      return {...state, reloadListener: action.content}
    default:
      return state;
  }
}

const initialValues = {
  todos: [],
  list: 'pending',
  reloadListener: 0
};

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
          <Todo 
            {...todo}
            reloadListener={state.reloadListener}
            setReloadListener={state.setReloadListener}
          />
        )}
      </ul>
    </div>
  );
}

export default App;
