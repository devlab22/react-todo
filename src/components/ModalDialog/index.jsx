import React from 'react';

import styles from './ModalDialog.module.scss';

export default function ModalDialog({children, visible, setVisible}) {

  return (
    <div className={`${styles.formModal} ${visible ? styles.active : ''}`} onClick={() => setVisible(false)}>
        <div className={styles.formModalContent} onClick={event => event.stopPropagation()}>
                {children}
        </div>
    </div>
  )
}