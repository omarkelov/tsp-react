import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { logoutAsync } from '../../store/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { combineClassNames } from '../../util/classNames';

import styles from './NavigationBar.module.scss';



const NavigationBar: FC = () => {
    const dispatch = useAppDispatch();

    const onLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        dispatch(logoutAsync());
    };

    const generateClassNames = ({ isActive }: { isActive: boolean }) => isActive
        ? combineClassNames(styles.link, styles.mLinkActive)
        : styles.link;

    return (
        <nav className={styles.root}>
            <NavLink className={generateClassNames} to='/movies'>Movies</NavLink>
            <NavLink className={generateClassNames} to='/dictionaries'>Dictionaries</NavLink>
            <a className={styles.link} href='/logout' onClick={onLogoutClick}>Logout (TODO)</a>
        </nav>
    );
};

export default NavigationBar;
