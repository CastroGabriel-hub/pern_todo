import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useState } from 'react';
import EditModal from '../EditModal/EditModal';
import './Todo.scss';

function Todo(props) {
    const { todo_id, description, is_completed, reloadListener, setReloadListener } = props;
    const [openModal, setOpenModal] = useState(false);
    const modalProps = { ...props, isOpen: openModal, setIsOpen: setOpenModal};

    function toggleCompleted(){
        axios.put(`http://localhost:5050/todos/updateStatus/${todo_id}`, {is_completed: !is_completed})
            .then((res) => {
                console.log(res.data);
                setReloadListener(reloadListener + 1);
            })
            .catch(error => console.log(error));
    }

    function deleteTodo(){
        axios.delete(`http://localhost:5050/todos/${todo_id}`)
            .then((res) => {
              console.log(res.data)
              setReloadListener(reloadListener + 1);
            })
            .catch(error => console.log(error));
    }

    return (
        <li className={is_completed ? 'todo finished' : 'todo'} >
            <input type="checkbox" id='checkbox' onClick={toggleCompleted} />
            <p>{ description }</p>
            <button id='btn-edit' onClick={() => setOpenModal(true)}>
                <MdEdit className='icon'/>
            </button>
            <button id='btn-delete' onClick={deleteTodo}>
                <MdDelete className='icon'/>
            </button>
            <EditModal {...modalProps} />
        </li>
    )
}

export default Todo;