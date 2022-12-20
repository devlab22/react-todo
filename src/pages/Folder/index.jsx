import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { MyInput, MyButton, ColorPalette } from '../../components';
import styles from './Folder.module.scss';

export default function Folder({ items = [], colors = [], onAdd, onEdit }) {

    const params = useParams();
    const navigate = useNavigate();

    const [folder, setFolder] = useState({
        id: null,
        name: '',
        seqnr: 0,
        colorId: 1
    });

    useEffect(() => {

        if (params.id === 'null') {
            return
        }

        setFolder(items.find(item => item.id === Number(params.id)))

    }, [])

    const handleOnSend = async () => {

        if (folder.id) {
            await onEdit(folder);
        } else {
            await onAdd(folder);
        }

        navigate(-1, { replace: true });
    }

    return (
        <div className={styles.container}>
            <form>
                <MyInput
                    readOnly
                    type="text"
                    value={folder.id ? folder.id : "new"}
                    title="ID"
                />
                <MyInput
                    autoFocus
                    type="text"
                    placeholder="Bezeichnung"
                    value={folder.name}
                    required
                    title="Bezeichnung"
                    onChange={event => setFolder(prev => ({ ...prev, name: event.target.value }))}
                >
                </MyInput>
                <MyInput
                    type="number"
                    placeholder="seqnr"
                    required
                    title="Seqnr"
                    value={folder.seqnr}
                    onChange={event => setFolder(prev => ({ ...prev, seqnr: Number(event.target.value) }))}
                >
                </MyInput>
            </form>

            <ColorPalette colors={colors} selectedId={folder.colorId} onClick={color => setFolder(prev => ({ ...prev, colorId: Number(color.id) }))} />

            <div className={styles.container__inline}>
                <MyButton className='myBtn__green' style={{ marginRight: 5 }} onClick={handleOnSend}>Speichern</MyButton>

                <MyButton className='myBtn__grey' onClick={() => navigate(-1, { replace: true })}>Abbrechen</MyButton>

            </div>

        </div>
    )
}
