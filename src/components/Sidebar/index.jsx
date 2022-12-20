import React from "react";

import {List } from '../../components';

import './Sidebar.scss';
import plusSvg from '../../assets/img/add.svg';

function Sidebar({ items = [], onClickItem, onClickRemove, colors=[], selectedId }) {

    const addFolder = [
        {
            icon: plusSvg,
            name: "Ordner hinzufügen",
            clsname: "add"
        }
    ];

    return (
        <div className="sidebar">
            <List items={addFolder}/>
            <List items={items.filter(item => item.id === 0)} onClickItem={onClickItem} selectedId={selectedId} colors={colors} />
            <List items={items.filter(item => item.id !== 0)} onClickRemove={onClickRemove} onClickItem={onClickItem} selectedId={selectedId} isRemovable={true} colors={colors} />
            
        </div>
    )
}

export default Sidebar;