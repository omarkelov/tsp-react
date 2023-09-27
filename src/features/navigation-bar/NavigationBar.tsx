import { FC } from 'react';
import { Link } from 'react-router-dom';

import { logoutAsync } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';

import styles from './NavigationBar.module.scss';



const NavigationBar: FC = () => {
    const dispatch = useAppDispatch();

    const onLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logoutAsync());
    };

    return (
        <nav className={styles.root}>
            <Link className={styles.link} to='/movies'>Movies</Link>
            <Link className={styles.link} to='/dictionaries'>Dictionaries</Link>
            <a className={styles.link} href='/logout' onClick={onLogoutClick}>Logout (TODO)</a>
        </nav>
    );
};

export default NavigationBar;
