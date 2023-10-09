import { createListenerMiddleware } from '@reduxjs/toolkit';

import { logout } from './authSlice';


export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    predicate: action => action?.payload?.code === 401,
    effect: async (_, { dispatch }) => {
        dispatch(logout());
    },
});
