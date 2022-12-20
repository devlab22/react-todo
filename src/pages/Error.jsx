import React from 'react';
import styles from './Pages.module.scss';

export default function Error({message='unbekannte Fehler'}) {

  return (
    <div className={styles.page}>
        <h1>Error</h1>

        <div className={styles.page__container}>
             <p className={styles.page__container__error}>{message}</p>
        </div>
       
    </div>
  )
}
