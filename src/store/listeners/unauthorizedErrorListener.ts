import { logout } from '../authSlice';
import { AppStartListening } from '../listenerMiddleware';


export const setupUnauthorizedErrorListener = (startListening: AppStartListening) => startListening({
    predicate: action => action?.payload?.code === 401,
    effect: async (_, { dispatch }) => {
        dispatch(logout());
    },
});
