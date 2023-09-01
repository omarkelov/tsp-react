import { FC } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { privateRoutes, publicRoutes } from './routes';


const App: FC = () => {
    const isAuth = true;

    return (
        <BrowserRouter>
            {isAuth && <NavigationBar />}
            <Routes>
                {(isAuth ? privateRoutes : publicRoutes).map(({ path, Element }) =>
                    <Route
                        key={path}
                        path={path}
                        element={<Element />}
                    />
                )}
                <Route path='*' element={<Navigate to={isAuth ? '/dictionaries' : 'login'} replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
