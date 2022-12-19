import React from 'react';
import styles from './Pages.module.scss';

export default function Home() {
  return (
    <div className={styles.page}>
        <h1>Home</h1>

        
        <div className={styles.page__container}>
            <ul>
                <li>Erstelle deine Aufgaben</li>
                <li>Verfeinere die Ziele</li>
            </ul>
           
        </div>
        
    </div>
  )
}
