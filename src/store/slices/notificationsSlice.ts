import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

import { deleteDictionaryAsync } from './dictionariesSlice';


export const NOTIFICATIONS_REDUCER_KEY = 'notifications';

export type NotificationType = 'info' | 'warning' | 'error';

export interface Notification {
    id: string;
    type: NotificationType;
    message: string;
}

export interface NotificationsState {
    notifications: Notification[];
}

const initialState: NotificationsState = {
    notifications: [],
};

export const notificationsSlice = createSlice({
    name: NOTIFICATIONS_REDUCER_KEY,
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.push(action.payload);
        },
        deleteNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(({ id }) => action.payload !== id);
        },
        deleteAllNotifications: state => {
            state.notifications = [];
        },
    },
    extraReducers: builder =>
        builder
            .addCase(deleteDictionaryAsync.rejected, (state, { meta: { arg: name, requestId: id }, payload: responseError, error }) => {
                state.notifications.push({
                    id,
                    type: 'error',
                    message: `Could not delete dictionary "${name}": ${responseError ? `server responded with ${responseError.code} code` : `${error.name} ${error?.message ? `(${error.message})` : ''}`}.`,
                });
            }),
});

export const { addNotification, deleteNotification, deleteAllNotifications } = notificationsSlice.actions;

export const selectNotifications = (state: RootState) => state[NOTIFICATIONS_REDUCER_KEY].notifications;

export default notificationsSlice.reducer;
