import React, { useState } from "react";

import { List, EditPopup} from '../../components';

import './AddButton.scss';
import plusSvg from '../../assets/img/add.svg';

function AddButtonList({colors=[], onAddFolder }) {

    const [visible, setVisible] = useState(false);

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

    const handleOnAddFolder = async (item) => {

        onAddFolder(item);
        setVisible(false);
    }

    return (
        <div className="add-list">
           
            <List items={items} onClickItem={handleOnClick} />
            
            {visible && (

                <EditPopup colors={colors} onValueChanged={handleOnAddFolder} onClose={() => setVisible(false)}/>
               
            )
            }

        </div>
    )
}

export default AddButtonList;