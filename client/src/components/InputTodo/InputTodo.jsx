import { useState } from 'react';
import axios from 'axios';
import './InputTodo.scss';


function InputTodo({reloadListener, setReloadListener}) {
    const [description, setDescription] = useState('');

    function handleChange(event){
        setDescription(event.target.value);
    }

    function submitForm(event){
        event.preventDefault();

        const body = { description };
        axios.post('http://localhost:5050/todos', body)
            .then((res) => {
                console.log(res.data);
                setDescription('');
                setReloadListener(reloadListener + 1);
            })
            .catch(error => console.log(error.message));
            
    }

    return (
        <form className='input-todo' onSubmit={submitForm}>
            <input 
                type='text' 
                placeholder='New todo here'
                value={description} 
                onChange={handleChange}
                required
            />
            <button type='submit'>Add</button>
        </form>
    )
}

export default InputTodo;