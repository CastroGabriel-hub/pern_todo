import axios from 'axios';
import './Todo.scss';

function Todo({ todo_id, description }) {

    async function deleteTodo(){
        try {
            await axios.delete(`http://localhost:5050/todos/${todo_id}`)
                .then(res => console.log(res));
        } catch (error) {
            console.error(error.message);
        }
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