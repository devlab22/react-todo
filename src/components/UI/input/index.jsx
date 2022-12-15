import React from 'react';
import styles from './MyInput.module.scss';


export default function MyInput(props) {
  return (
    <input className={styles.myInput} {...props} />
  )
}