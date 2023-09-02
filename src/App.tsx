import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { privateRoutes, publicRoutes } from './routes';
import { selectIsLoggedIn } from './store/authSlice';
import { useAppSelector } from './store/hooks';
import './styles/App.module.scss';


const App: FC = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    return (
        <BrowserRouter>
            {isLoggedIn && <NavigationBar />}
            <Routes>
                {(isLoggedIn ? privateRoutes : publicRoutes).map(({ path, Element }) =>
                    <Route
                        key={path}
                        path={path}
                        element={<Element />}
                    />
                )}
                <Route path='*' element={<Navigate to={isLoggedIn ? '/dictionaries' : 'login'} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
