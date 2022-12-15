import React from "react";

import {List, AddButton } from '../../components';

import './Sidebar.scss'

function Sidebar({ items = [], onClickItem, onClickRemove, colors=[], selectedId, onAddFolder }) {

    return (
        <div className="sidebar">
            <AddButton colors={colors} onAddFolder={onAddFolder}/>
            <List items={items.filter(item => item.id === 0)} onClickItem={onClickItem} selectedId={selectedId} colors={colors} />
            <List items={items.filter(item => item.id !== 0)} onClickRemove={onClickRemove} onClickItem={onClickItem} selectedId={selectedId} isRemovable={true} colors={colors} />
            
        </div>
    )
}

export default Sidebar;