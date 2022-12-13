import React, { useState, useEffect } from "react";

import { List, Badge, EditPopup} from '../../components';

import './AddButton.scss';
import plusSvg from '../../assets/img/add.svg';
import closeSvg from '../../assets/img/close.svg';

function AddButtonList({colors=[], onAddFolder }) {

    const [visible, setVisible] = useState(false);
    const [colorId, setColorId] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [seqnr, setSeqnr] = useState(0);
    
    useEffect(() => {

        if(colors.length > 0){
            setColorId(colors[0].id)
        }
    }, [colors]);

    const items = [
        {
            icon: plusSvg,
            name: "Ordner hinzufügen",
            clsname: "add"
        }
    ];

    const handleOnClick = () => {
        setVisible(true);
    };

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

        onAddFolder(item);
        handleOnClose();
    }

    const handleOnClose = () => {
        setInputValue('');
        setVisible(false);
        if(colors.length > 0){
            setColorId(colors[0].id)
        }
       
    }

    return (
        <div className="add-list">
           
            <List items={items} onClickItem={handleOnClick} />
            
            {visible && (

                <EditPopup colors={colors} onValueChanged={handleOnAddFolder} onClose={handleOnClose}/>
               /*  <div className="add-list-popup">
                    <img src={closeSvg} alt="close" className="add-list-popup-close-btn" onClick={handleOnClose} />
                    <input autoFocus value={inputValue} className="field" type="text" placeholder="Bezeichnung" onChange={event => setInputValue(event.target.value)} required ></input>
                    <input value={seqnr} className="field" type="number" required placeholder="Seqnr" onChange={event => setSeqnr(event.target.value)} ></input>
                    <div className="add-list-colors">

                        {colors.map(color =>
                            <Badge
                                key={color.id}
                                onClick={() => setColorId(color.id)}
                                color={color.name}
                                className={`pointer ${color.id === colorId ? 'active' : ""}`}
                            />
                        )}

                    </div>
                    <button className="button" onClick={handleOnAddFolder}>Hinzufügen</button>
                </div> */
            )
            }

        </div>
    )
}

export default AddButtonList;