import { useState, useEffect } from 'react';
import {GrClose} from 'react-icons/gr';
import axios from 'axios';
import './EditModal.scss';

function EditModal(props) {
    const {
        todo_id,
        description,
        state,
        dispatch,
        openModal,
        setOpenModal,
        reloadListener,
        setReloadListener
    } = props;
    const [content, setContent] = useState('');

    useEffect(() => {
        setContent(description);
    }, [openModal, description])
    
    function closeModal(){
        setOpenModal(false);
    }

    function handleChange(event){
        setContent(event.target.value);
    }

    function updateTodo(){
        axios.put(`http://localhost:5050/todos/${todo_id}`, {description: content})
            .then((res) => {
                console.log(res.data)
                closeModal();
                dispatch({type: 'reloadPage', content: state.reloadListener + 1});
            })
            .catch(error => console.log(error));
    }

    return (
        <div className={openModal ? 'opened' : 'closed'}>
            <div className="modal">
                <GrClose id='close' onClick={closeModal}/>
                <h3>Update the task bellow</h3>
                <input type="text" value={content} onChange={handleChange} />
                <button id='btn-cancel' onClick={closeModal} >Cancel</button>
                <button id='btn-confirm' onClick={updateTodo} >Confirm</button>
            </div>
        </div>
    )
}

export default EditModal;