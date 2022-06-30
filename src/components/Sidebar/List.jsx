import React from "react";

import { Badge}  from "../../components";

import './Sidebar.scss';
import removeIcon from '../../assets/img/remove.svg';

function List({ items = [], onClickItem, onClickRemove, selectedId=null, isRemovable=false}) {

 // console.log(items)
  return (
    <ul className="list">
      {
        items.map((item, index) => (
          <li key={index} className={item.clsname + ' ' + ( selectedId === item.id && 'active' ) } onClick={() => onClickItem(item.id)}>
            <i>
              {item.icon ? (<img src={item.icon} alt="icon" ></img>) : <Badge color={item.color} hex={item.colorHex} />}
            </i>
            <span>
              {item.name}
              {( item.tasks && item.tasks > 0) && item.tasks}
             </span> 
            {isRemovable && <img className="removable" src={removeIcon} alt="remove" onClick={(event) => onClickRemove(event, item.id)} ></img>}
          </li>
        ))
      }
    </ul>
  )
}

export default List;