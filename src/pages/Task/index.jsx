import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { MyInput, MyButton } from '../../components';
import styles from './Task.module.scss';

export default function Task({ tasks = [], onAdd, onEdit }) {

    const params = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState({
        id: null,
        text: '',
        seqnr: ''
    });

    useEffect(() => {

        if (params.id === 'null') {
            return
        }

        setTask(tasks.find(item => item.id === Number(params.id)))

    }, [])

    const handleOnSend = async () => {
       
        await onEdit(task);
        navigate(-1, { replace: true });
    }

    return (
        <div className={styles.container}>
            <form>
                <MyInput
                    readOnly
                    type="text"
                    placeholder="Bezeichnung"
                    value={`id ${task.id}`}
                    required
                    onChange={event => { }}
                />
                <MyInput
                    autoFocus
                    type="text"
                    placeholder="Bezeichnung"
                    value={task.text}
                    required
                    onChange={event => setTask(prev => ({ ...prev, text: event.target.value }))}
                >
                </MyInput>
                <MyInput
                    type="number"
                    placeholder="seqnr"
                    required
                    value={task.seqnr}
                    onChange={event => setTask(prev => ({ ...prev, seqnr: Number(event.target.value) }))}
                >
                </MyInput>
            </form>

            <div className={styles.container__inline}>
                <MyButton className='myBtn__green' style={{ marginRight: 5 }} onClick={handleOnSend}>Speichern</MyButton>

                <MyButton className='myBtn__grey' onClick={() => navigate(-1, { replace: true })}>Abbrechen</MyButton>

            </div>

        </div>
    )
}
