import React, { useState, useEffect } from 'react';

import { Badge } from '../../components';

import closeSvg from '../../assets/img/close.svg';
import styles from './EditPopup.module.scss';

export default function EditPopup({ colors = [], selectedItem = null, onValueChanged, onClose }) {

    const [colorId, setColorId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [seqnr, setSeqnr] = useState(0);

    useEffect(() => {

        if (colors.length > 0) {
            setColorId(colors[0].id)
        }

        if (selectedItem != null) {
            setColorId(selectedItem.colorId)
        }

    }, [colors, selectedItem]);

    const handleOnAddFolder = () => {

        if (!inputValue) {
            alert('Geben Sie bitte Bezeichung ein');
            return;
        }

        const item = {
            name: inputValue,
            colorId: colorId,
            seqnr: seqnr
        }

        onValueChanged(item);

    };

    return (
        <div className={styles.add_list}>
       
        <div className={styles.add__list__popup}>
            <img src={closeSvg} alt="close" className={styles.add__list__popup__close__btn} onClick={onClose} />
            <input autoFocus value={inputValue} className={styles.add__list__field} type="text" placeholder="Bezeichnung" onChange={event => setInputValue(event.target.value)} required ></input>
            <input value={seqnr} className={styles.add__list__field} type="number" required placeholder="Seqnr" onChange={event => setSeqnr(event.target.value)} ></input>
            <div className={styles.add__list__colors}>

                {colors.map(color =>
                    <Badge
                        key={color.id}
                        onClick={() => setColorId(color.id)}
                        color={color.name}
                        className={`pointer ${color.id === colorId ? 'active' : ""}`}
                    />
                )}

            </div>
            <button className={styles.add__list__button} onClick={handleOnAddFolder}>Hinzufügen</button>
        </div>
        </div>
    )
}
