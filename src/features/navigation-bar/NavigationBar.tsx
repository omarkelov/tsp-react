import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutAsync, selectLogin } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';

import styles from './NavigationBar.module.scss';



const NavigationBar: FC = () => {
    const dispatch = useAppDispatch();
    const login = useSelector(selectLogin);

    const onLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logoutAsync());
    };

    return (
        <nav className={styles.root}>
            <Link className={styles.link} to='/movies'>Movies</Link>
            <Link className={styles.link} to='/dictionaries'>Dictionaries</Link>
            <a className={styles.link} href='/logout' onClick={onLogoutClick}>{`Logout (${login})`}</a>
        </nav>
    );
};

export default NavigationBar;
