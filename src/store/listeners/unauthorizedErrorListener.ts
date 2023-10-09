import { AppStartListening } from '../listenerMiddleware';
import { logout } from '../slices/authSlice';


export const setupUnauthorizedErrorListener = (startListening: AppStartListening) => startListening({
    predicate: action => action?.payload?.code === 401,
    effect: async (_, { dispatch }) => {
        dispatch(logout());
    },
});
