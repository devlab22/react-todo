import React, { useState } from 'react'

import './Tasks.scss';
import addSvg from '../../assets/img/add.svg';
//import closeSvg from '../../assets/img/close.svg';

export default function AddTaskForm({ onAddTask }) {

  const [visible, setVisible] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleOnAddTask = () => {

    if (!newTask) {
      alert('text ist leer');
      return;
    }

    const task = {
      text: newTask,
      completed: false
    }

    setIsSending(true);
    onAddTask(task);
    setIsSending(false);
    handleOnClose();
    
  }

  const handleOnClose = () => {
    setNewTask('');
    setVisible(false);
  }


  return (
    <div className="tasks-form">

      {!visible ? (
        <div className="tasks-form-new" onClick={() => setVisible(true)}>
          <img src={addSvg} alt="add" />
          <span>Neue Aufgabe</span>
        </div>)
        : (
          <div className="tasks-form-new-popup">
            <input className='field' placeholder='Bezeichnung' type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            {/* <img src={closeSvg} alt="close" className='tasks-form-new-popup-close-btn' onClick={handleOnClose} /> */}

            <div className="tasks-form-new-popup-block">
              <button disabled={isSending} className='button' onClick={handleOnAddTask}>{isSending ? '...' : 'Hinzufügen'}</button>
              <button className='button button-grey' onClick={handleOnClose}>Abbrechen</button>
            </div>

          </div>
        )}


    </div>
  )
}
