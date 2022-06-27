import React from "react";
import listSvg from '../../assets/img/list.svg'

import styles from './List.module.scss'

function List({items=[], label=''}) {
    return (
        <ul className={styles.todo__list}>
            <li>
                <i>
                    <img src={listSvg} alt='list item' ></img>
                </i>
                <span>{label}</span>
            </li>
        </ul>
    )
}

export default List;