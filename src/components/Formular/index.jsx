import React, { useState, useEffect } from 'react';

import { MyInput, MyButton, ColorPalette } from '../../components';
import styles from './Formular.module.scss';

export default function Formular({ title, hex, colors = [], selectedItem = null, onValueChanged, onClose, }) {

    const [colorId, setColorId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [seqnr, setSeqnr] = useState(0);

    useEffect(() => {

        if (colors.length > 0) {
            setColorId(colors[0].id)
        }

        if (selectedItem != null) {
            setColorId(selectedItem.colorId);
            setInputValue(selectedItem.name);
            setSeqnr(selectedItem.seqnr);
        }

    }, []);

    const handleOnSubmit = () => {

        const values = {
            name: inputValue,
            seqnr: Number(seqnr),
            colorId: colorId
        }

        onValueChanged(values);
        
    }

    return (

        <div className={styles.formular}>

            <form>

                {title && <h1 className={styles.formular__h1} style={{color: hex}}>{title}</h1>}

                <MyInput
                    autoFocus
                    value={inputValue}
                    type="text"
                    placeholder="Bezeichnung"
                    onChange={event => setInputValue(event.target.value)}
                    required >
                </MyInput>
                <MyInput
                    value={seqnr}
                    type="number"
                    required
                    placeholder="Seqnr"
                    onChange={event => setSeqnr(event.target.value)}>

                </MyInput>

            </form>
            {colors.length > 0 && (

                <ColorPalette
                    selectedId={colorId}
                    colors={colors}
                    onClick={(item) => setColorId(item.id)} />

            )}


            <div className={styles.formular__inline}>
                <MyButton className="myBtn__green" style={{ marginRight: 5 }} onClick={handleOnSubmit}>Speichern</MyButton>
                <MyButton className="myBtn__grey" onClick={onClose}>Abbrechen</MyButton>
            </div>
        </div>

    )
}
