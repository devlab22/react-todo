import React from 'react';

import styles from './MySelect.module.scss';

export default function MySelect({ options, OnChange, name, value, readOnly=false, style={} }) {
    
    return (
        <select 
            className={styles.mySelect}
            style={style}
            value={value}
            onChange={event => OnChange(event.target.value)}
            >
            <option key='99' disabled value=''>{name}</option>

            {
                options.map(item => (
                    <option
                        disabled={readOnly}
                        key={item.key}
                        value={item.key}
                        >
                        {item.value}
                    </option>
                ))
            }
        </select>
    )
}