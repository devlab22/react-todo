import React from 'react'

import './Tasks.scss';
import addSvg from '../../assets/img/add.svg';

export default function AddTaskForm() {
  return (
    <div className="tasks-form">
    <div className="tasks-form-new">
        <img src={addSvg} alt="add" />
        <span>neue Aufgabe</span>
    </div>
</div>
  )
}
