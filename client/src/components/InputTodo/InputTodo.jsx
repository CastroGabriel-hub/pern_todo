import { useState } from 'react';
import axios from 'axios';
import './InputTodo.scss';


function InputTodo() {
    const [description, setDescription] = useState('');

    function handleChange(event){
        setDescription(event.target.value);
    }

    async function submitForm(event){
        event.preventDefault();

        try {
            const body = { description };
            await axios.post('http://localhost:5050/todos', body)
                .then((res) => {
                    console.log(res);
                });
            setDescription('');
        } catch (error) {
            console.error(error.message);
        }
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