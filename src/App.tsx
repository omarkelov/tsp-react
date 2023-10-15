import { FC } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import NavigationBar from './features/navigation-bar/NavigationBar';
import NotificationsList from './features/notifications/NotificationsList';
import Player from './features/player/Player';
import NotFoundPage from './pages/not-found/NotFoundPage';
import { PageRoute, privateRoutes, publicRoutes } from './routes';
import { selectLogin } from './store/slices/authSlice';
import styles from './styles/App.module.scss';


const generateRoutes = (pageRoutes: PageRoute[]) => pageRoutes.map(({ path, Element }) => (
    <Route
        key={path}
        path={path}
        element={<Element />}
    />
));

const App: FC = () => {
    const login = useSelector(selectLogin);

    return (
        <BrowserRouter>
            {login ? (
                <div className={styles.root}>
                    <NavigationBar />
                    <Routes>
                        {generateRoutes(privateRoutes)}
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                    <Player />
                </div>
            ) : (
                <Routes>
                    {generateRoutes(publicRoutes)}
                    <Route path='*' element={<Navigate to='/login' replace />} />
                </Routes>
            )}
            <NotificationsList />
        </BrowserRouter>
    );
};

export default App;
