import React from "react";

import {List, AddButton } from '../../components';

import './Sidebar.scss'

function Sidebar({ items = [], onClickItem, onClickRemove, colors=[], selectedId, onAddFolder }) {

    return (
        <div className="sidebar">
            <List items={items.filter(item => item.id === 0)} onClickItem={onClickItem} selectedId={selectedId} />
            <List items={items.filter(item => item.id !== 0)} onClickRemove={onClickRemove} onClickItem={onClickItem} selectedId={selectedId} isRemovable={true} />
            <AddButton colors={colors} onAddFolder={onAddFolder}/>
        </div>
    )
}

export default Sidebar;