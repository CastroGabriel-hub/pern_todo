import './Todo.scss';

function Todo({ id, description }) {
    return (
        <li className='todo' key={id}>
            <input type="checkbox" />
            <p>{ description }</p>
            <button>Edit</button>
            <button>delete</button>
        </li>
    )
}

export default Todo;