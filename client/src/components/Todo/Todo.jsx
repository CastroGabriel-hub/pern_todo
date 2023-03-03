import axios from 'axios';
import './Todo.scss';

function Todo({ todo_id, description, reloadListener, setReloadListener }) {

    function deleteTodo(){
        axios.delete(`http://localhost:5050/todos/${todo_id}`)
            .then((res) => {
              console.log(res.data)
              setReloadListener(reloadListener + 1);
            })
            .catch(error => console.log(error));
    }
      
    return (
        <li className='todo' >
            <input type="checkbox" />
            <p>{ description }</p>
            <button >Edit</button>
            <button onClick={deleteTodo}>delete</button>
        </li>
    )
}

export default Todo;