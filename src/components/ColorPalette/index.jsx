import React, { useState, useEffect } from 'react'

import styles from './ColorPalette.module.scss';
import { Badge } from '../../components';

export default function ColorPalette({ selectedId=null, width=15, colors=[], onClick }) {

    const [active, setActive] = useState(selectedId);

    useEffect(() => {

        if(selectedId === null){
            setActive(colors[0].id);
        }else{
            setActive(selectedId);
        }

    }, [selectedId]);

    const handleOnClick = (id) => {
        setActive(id);
        const item = colors.filter(item => item.id === id)[0];
        onClick(item);
    }
    return (
        <div className={styles.container}>

            {colors.map(item => (

                <div className={styles.container__inline} key={item.id} >
                    <Badge
                        id={item.id}
                        width={width}
                        className={`pointer ${active === item.id && 'active'}`}
                        hex={item.hex}
                        label={item.name}
                        onClick={() => handleOnClick(item.id)}
                    />

                </div>

            ))

            }

        </div>
    )
}
