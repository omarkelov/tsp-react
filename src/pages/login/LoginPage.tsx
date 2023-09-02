import { FC } from 'react';
import { useDocumentTitle } from 'usehooks-ts';
import logo from '../../assets/logo-big.png';
import LoginForm from '../../features/login-form/LoginForm';
import styles from './LoginPage.module.scss';


const LoginPage: FC = () => {
    useDocumentTitle('Login | Translate Subs Player');

    return (
        <div className={styles.root}>
            <img src={logo} alt='Translate Subs Player' />
            <LoginForm />
        </div>
    );
};

export default LoginPage;
