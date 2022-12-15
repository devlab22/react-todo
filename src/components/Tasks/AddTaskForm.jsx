import React, { useState } from 'react'
import { Circles } from 'react-loader-spinner';
import './Tasks.scss';
import addSvg from '../../assets/img/add.svg';
import { EditPopup } from '..';

export default function AddTaskForm({ onAddTask }) {

  const [visible, setVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleOnAddTask = async (item) => {

    if (!item) {
      alert('text ist leer');
      return;
    }

    const task = {
      text: item.name,
      completed: false,
      seqnr: item.seqnr
    }

     
    console.log(task)
  
    setIsSending(true);
    await onAddTask(task);
    setIsSending(false);
    setVisible(false);
    
  }

  if (isSending) {

    return (
      <div className='loading-container'>
        <Circles
          color="#00BFFF"
          height={80}
          width={80} />
      </div>
    )

  }

  return (
    <div className="tasks-form">

      {!visible ? (
        <div className="tasks-form-new" onClick={() => setVisible(true)}>
          <img src={addSvg} alt="add" />
          <span>Neue Aufgabe</span>
        </div>)
        : (
          <EditPopup 
            style={{height: 160}} 
            onClose={() => setVisible(false)} 
            onValueChanged={handleOnAddTask}/>
        )}

    </div>
  )
}
