import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AddTaskForm, Formular, EditPopup, CheckBoxCircle, Toggle, ModalDialog } from '../../components';

import './Tasks.scss';
import editSvg from '../../assets/img/edit.svg';
import removeSvg from '../../assets/img/remove.svg';
import addSvg from '../../assets/img/add.svg';

export default function Tasks({ selectedId, lists = [], colors = [], tasks = [], onEditFolder, onDeleteTask, onEditTask, onCompleteTask, onAddTask, withoutEmpty = false }) {

    const [editDia, setEditDia] = useState(false);
    const [editTaskDia, setEditTaskDia] = useState(false);
    const [editTask, setEditTask] = useState({});
    const [visible, setVisible] = useState(false);

    const params = useParams();
    const navigate = useNavigate();
    // console.log(params)

    if (!selectedId) {
        selectedId = Number(params.id)
    }

    const selectedItem = selectedId >= 0 ? lists.find(item => item.id === selectedId) : null;

    let title = '';
    let seqnr = 0;
    let items = [];

    if (selectedItem) {
        title = selectedItem.name;
        seqnr = selectedItem.seqnr;
        selectedItem.id === 0 ? items = tasks : items = tasks.filter(item => item.listId === selectedId).sort((a, b) => a.seqnr - b.seqnr);
    }

    const handleOnAddTask = (task) => {

        task.text = task.name;
        task.listId = selectedId;

        onAddTask(task);
        setVisible(false);
    }

    const handleOnChangeCheckbox = (taskId, checked) => {
        onCompleteTask(taskId, checked);
    }

    const handleOnFolderChanged = async (item) => {

        onEditFolder(item);
        setEditDia(false);
    }

    const handleOnEditTask = (task) => {

        navigate(`/task/${task.id}`)
        /*  task.name = task.text;
         setEditTask(task)
         setEditTaskDia(true); */
    }

    const handleOnTaskChanged = async (task) => {


        const updateTask = {
            id: task.id,
            text: task.name,
            seqnr: task.seqnr
        }

        console.log(updateTask)

        onEditTask(updateTask);
        setEditTaskDia(false);
    }


    return (
        <div className='tasks'>

            <h1 className='tasks__title'
                style={{ color: colors.find(color => color.id === selectedItem.colorId).hex }}
            >
                {seqnr} {title}
                {selectedItem && (

                    <span>
                        <img src={editSvg} alt="edit" title="edit name" onClick={() => navigate(`/list/${selectedItem.id}`)} />
                    </span>

                )}
            </h1>

            {editDia &&
                <EditPopup
                    colors={colors}
                    selectedItem={selectedItem}
                    onValueChanged={handleOnFolderChanged}
                    btnTitle="Ändern"
                    onClose={() => setEditDia(false)}
                />

            }

            {editTaskDia &&
                <EditPopup
                    style={{ height: 160 }}
                    selectedItem={editTask}
                    onValueChanged={handleOnTaskChanged}
                    btnTitle="Ändern"
                    onClose={() => setEditTaskDia(false)}
                />

            }


            <div className='tasks__items'>
                {items.length === 0 ? (!withoutEmpty && selectedId && <h2>keine Aufgaben</h2>) :

                    items.map(item => (

                        <div key={item.id} className="tasks__items-row">

                            <CheckBoxCircle id={item.id} label={item.text} completed={item.completed} onClick={handleOnChangeCheckbox} />

                            <img src={editSvg} alt="edit" onClick={onEditTask && (() => handleOnEditTask(item))} />
                            <img src={removeSvg} alt="remove" onClick={onDeleteTask && (() => onDeleteTask(item))} />

                        </div>
                    ))}

                {/* <Toggle label="Python" style={{fontWeight: "bold"}} onClick={(checked) => console.log('toogle', checked)}/> */}

                {/* {selectedId > 0 && <AddTaskForm onAddTask={handleOnAddTask} />} */}


            </div>

            { !visible ? 
            
            <div className='tasks'>
                <div className='tasks-form'>
                    <div className="tasks-form-new" onClick={() => setVisible(true)}>
                        <img src={addSvg} alt="add" />
                        <span>Neue Aufgabe</span>
                    </div>
                </div>
            </div>
            : <ModalDialog visible={visible} setVisible={setVisible}>
                <Formular 
                    title="neu Aufgabe" 
                    hex={colors.find(color => color.id === selectedItem.colorId).hex }
                    onValueChanged={handleOnAddTask}
                    onClose={() => setVisible(false)}/>
                
            </ModalDialog>
            }
        </div>
    )
}
