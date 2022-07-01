import React from 'react'

import { AddTaskForm } from '../../components';

import './Tasks.scss';
import editSvg from '../../assets/img/edit.svg';
import removeSvg from '../../assets/img/remove.svg';
import addSvg from '../../assets/img/add.svg';

export default function Tasks({ selectedId, lists = [], tasks = [], onEditTitle, onDeleteTask }) {

    const selectedItem = selectedId >= 0 ? lists.find(item => item.id === selectedId) : null;

    let title = '';
    let items = [];

    if (selectedItem) {
        title = selectedItem.name;
        selectedItem.id === 0 ? items = tasks : items = tasks.filter(item => item.listId === selectedId);
    }

    return (
        <div className='tasks'>
            <h1 className='tasks__title'>
                {title}
                {selectedItem && (<img src={editSvg} alt="edit" onClick={onEditTitle && (() => onEditTitle(selectedItem))} />)}
            </h1>

            <div className='tasks__items'>
                {items.length === 0 ? (selectedId && <h2>keine Aufgaben</h2>) :

                    items.map(item => (

                        <div key={item.id} className="tasks__items-row">

                            <div className="checkbox">

                                <input id={`task-${item.id}`} type="checkbox" />
                                <label htmlFor={`task-${item.id}`}>
                                    <svg
                                        width="11"
                                        height="8"
                                        viewBox="0 0 11 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                                            stroke="#000"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round" />
                                    </svg>
                                </label>

                            </div>

                            <input readOnly className='task' type="text" value={item.text} onChange={() => { }} />
                            <img src={removeSvg} alt="edit" onClick={onDeleteTask && (() => onDeleteTask(item.id))} />
                        </div>
                    )

                    )}
                 { selectedId > 0 && <AddTaskForm />}
            </div>
        </div>
    )
}