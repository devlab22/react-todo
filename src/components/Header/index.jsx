import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

export default function Header({ setCurrentPath }) {
    return (
        <div className={styles.header}>
            <Link to='/' onClick={() => setCurrentPath("/")}>
                <div className={styles.header__title__link}>
                    My Todo List
                </div>
            </Link>

            <div className={styles.form__btn}>
                <Link to='/about'>
                    <div className={`${styles.navbar__link__about} ${styles.navbar__link}`}>
                        About
                    </div>
                </Link>
            </div>

        </div>
    )
}
