import React from "react";
import listSvg from '../../assets/img/list.svg'

function List() {
    return (
        <ul className='todo__list'>
            <li>
                <i>
                    <img src={listSvg} alt='list item' ></img>
                </i>
                <span>Alle Aufgaben</span>
            </li>
        </ul>
    )
}

export default List;