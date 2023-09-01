import { FC } from 'react';
import { logoutAsync } from '../store/authSlice';
import { useAppDispatch } from '../store/hooks';


const NavigationBar: FC = () => {
    const dispatch = useAppDispatch();

    return (
        <div>
            <button onClick={() => dispatch(logoutAsync())}>Logout</button>
        </div>
    );
};

export default NavigationBar;
