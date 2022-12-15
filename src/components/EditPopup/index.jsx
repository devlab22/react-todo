import React, { useState, useEffect } from 'react';

import { MyInput, MyButton, ColorPalette } from '../../components';

import closeSvg from '../../assets/img/close.svg';
import styles from './EditPopup.module.scss';

export default function EditPopup({ colors = [], selectedItem = null, onValueChanged, onClose, btnTitle = "Speichern", ...props }) {

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

    const handleOnAddFolder = () => {

        var id = null;
        if (selectedItem) {
            id = selectedItem.id;
        }

        const item = {
            id: id,
            name: inputValue,
            colorId: colorId,
            seqnr: parseInt(seqnr, 10)
        }

        onValueChanged(item);

    };

    return (
        <div className={styles.add_list}>

            <div className={styles.add__list__popup}
                style={props.style}
            >
                <img src={closeSvg} alt="close" className={styles.add__list__popup__close__btn} onClick={onClose} />
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
                    className={styles.add__list__field}
                    type="number"
                    required
                    placeholder="Seqnr"
                    onChange={event => setSeqnr(event.target.value)}>

                </MyInput>

                {colors.length > 0 && (

                    <ColorPalette selectedId={colorId} colors={colors} onClick={(item) => setColorId(item.id)} />

                )}
                <div className={styles.add__list__popup__inline}>
                    <MyButton className="myBtn__green" onClick={handleOnAddFolder}>{btnTitle}</MyButton>
                    <MyButton className="myBtn__grey" onClick={onClose}>Abbrechen</MyButton>
                </div>

            </div>
        </div>
    )
}


/* 

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












 */


