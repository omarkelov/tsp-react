import { createListenerMiddleware, TypedStartListening } from '@reduxjs/toolkit';

import { startUnauthorizedErrorListener } from './listeners/unauthorizedErrorListener';
import { AppDispatch, RootState } from './store';


export const listenerMiddleware = createListenerMiddleware({
    onError: () => console.error,
});

export const startAppListening = listenerMiddleware.startListening as TypedStartListening<RootState, AppDispatch>;
// export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>;

startUnauthorizedErrorListener();
