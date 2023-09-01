import { FC } from 'react';
import { loginAsync } from '../store/authSlice';
import { useAppDispatch } from '../store/hooks';


const LoginPage: FC = () => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <button onClick={() => dispatch(loginAsync({ login: 'admin', password: 'admin' }))}>Login</button>
        </div>
    );
};

export default LoginPage;
