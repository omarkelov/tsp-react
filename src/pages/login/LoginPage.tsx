import { FC } from 'react';

import logo from '/images/logo-big.png'; // eslint-disable-line import/no-unresolved

import LoginForm from '../../features/login-form/LoginForm';
import { useAppTitle } from '../../hooks/title';

import styles from './LoginPage.module.scss';


const LoginPage: FC = () => {
    useAppTitle('Login');

    return (
        <div className={styles.root}>
            <img src={logo} alt='Translate Subs Player' />
            <LoginForm />
        </div>
    );
};

export default LoginPage;
