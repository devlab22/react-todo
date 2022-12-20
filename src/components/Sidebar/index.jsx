import React, {Fragment} from "react";

import { List } from '../../components';

import './Sidebar.scss';
import plusSvg from '../../assets/img/add.svg';
import listSvg from '../../assets/img/list.svg';

function Sidebar({ items = [], tasks = 0, login = false, onClickItem, onClickRemove, colors = [], selectedId }) {

    const addFolder = [
        {
            icon: plusSvg,
            name: "Ordner hinzufügen",
            clsname: "add"
        }
    ];

    const allTasks = [
        {
            name: "Alle Aufgaben",
            id: 0,
            icon: listSvg,
            tasks: tasks,
            clsname: "mb30"
        }
    ];

    return (
        <div className="sidebar">

            {login && (

                <Fragment>
                    <List 
                        items={addFolder} />
                    <List 
                        items={allTasks} 
                        onClickItem={onClickItem} 
                        selectedId={selectedId} />
                    <List 
                        items={items.filter(item => item.id !== 0)} 
                        onClickRemove={onClickRemove} 
                        onClickItem={onClickItem} 
                        selectedId={selectedId} 
                        isRemovable={true} 
                        colors={colors} />
                </Fragment>

            )}

        </div>
    )
}

export default Sidebar;