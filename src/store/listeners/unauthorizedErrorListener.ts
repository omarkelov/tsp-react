import { startAppListening } from '../listenerMiddleware';
import { logout } from '../slices/authSlice';


export const startUnauthorizedErrorListener = () => startAppListening({
    predicate: action => action?.payload?.code === 401,
    effect: async (_, { dispatch }) => {
        dispatch(logout());
    },
});
