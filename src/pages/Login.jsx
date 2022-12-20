import React, { useState } from 'react';

import styles from './Pages.module.scss';
import { MyInput, MyButton } from '../components';

export default function Login({ onLogin }) {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        const values = {
            login: login,
            password: password
        }

        onLogin(values);
    }

    return (
        <div className={styles.page}>

            <h1>Login</h1>

            <form className={styles.page__container} onSubmit={onSubmit}>
                <MyInput
                    autoFocus
                    required
                    value={login}
                    type="text"
                    placeholder='Login'
                    onChange={event => setLogin(event.target.value)}
                />
                <MyInput
                    required
                    value={password}
                    type="password"
                    placeholder='Password'
                    onChange={event => setPassword(event.target.value)}
                />
                <MyButton className='myBtn__green'>Login</MyButton>
            </form>
        </div>
    )
}
