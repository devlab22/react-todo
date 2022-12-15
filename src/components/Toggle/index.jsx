import { useState } from 'react'
import styles from './Toggle.module.scss'

export default function Toggle({ label, toggled, onClick, ...props }) {
    const [isToggled, toggle] = useState(toggled)

    const callback = () => {
        toggle(!isToggled)
        onClick(!isToggled)
    }

    return (
        <div className={styles.container}>

            <p style={props.style}>{label}</p>

            <label>
                <input type="checkbox" defaultChecked={isToggled} onClick={callback} />
                <span />
            </label>
        </div>
    )
}