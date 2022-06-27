import React from "react";

import removeIcon from '../../assets/img/remove.svg';

import './Sidebar.scss'

function Sidebar({ items = [] }) {

    return (
        <div className="sidebar">
            <ul className="list">
              {
                items.map((item, index) =>  (           
                <li key={index} className={item.clsname}>
                    <i>
                    { item.icon ? (
                        <img src={item.icon} alt="icon" ></img>) : (
                        <i className={`badge badge-${item.color}`}></i>
                        ) }
                    </i>
                    <span>{item.name}</span> 

                   {
                    item.removable && <img className="removable" src={removeIcon} alt="remove" ></img>
                   }                  
                </li>               
                ))
              }
            </ul>
        </div>
    )
}

export default Sidebar;