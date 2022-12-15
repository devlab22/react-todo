import React, { useState } from 'react'
import styles from './CheckBoxCircle.module.scss';

export default function CheckBoxCircle({ id, label, completed = false, onClick, ...props }) {

    const [completedValue, setCompletedValue] = useState(completed);

    const handleOnClick = (event) => {

        setCompletedValue(event.target.checked);
        onClick(id, event.target.checked);

    }

    return (
        <div className={styles.item__row}>
            <div className={styles.checkbox}>

                <input id={`task-${id}`} type="checkbox" checked={completedValue} onChange={handleOnClick} />
                <label htmlFor={`task-${id}`}>
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                    // xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                            stroke="#000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round" />
                    </svg>
                </label>

            </div>

            {label && (
               // <input readOnly style={props.style} className={styles.checkbox__label} type="text" value={label} onChange={() => { }} />
                <p style={props.style} className={styles.checkbox__label}>{label}</p>
            )}

        </div>

    )
}
