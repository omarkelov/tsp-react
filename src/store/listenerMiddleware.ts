import { createListenerMiddleware, TypedAddListener, TypedStartListening } from '@reduxjs/toolkit';

import { setupUnauthorizedErrorListener } from './listeners/unauthorizedErrorListener';
import { AppDispatch, RootState } from './store';


export const listenerMiddleware = createListenerMiddleware({
    onError: () => console.error,
});

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppAddListener = TypedAddListener<RootState, AppDispatch>;

const startAppListening = listenerMiddleware.startListening as AppStartListening;
// const addAppListener = addListener as AppAddListener;

const setupListeners = [setupUnauthorizedErrorListener] as const;

setupListeners.forEach(setupListener => setupListener(startAppListening));
