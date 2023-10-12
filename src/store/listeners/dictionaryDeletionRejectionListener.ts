import { startAppListening } from '../listenerMiddleware';
import { deleteDictionaryAsync } from '../slices/dictionariesSlice';
import { addNotification } from '../slices/notificationsSlice';


export const startDictionaryDeletionRejectionListener = () => startAppListening({
    actionCreator: deleteDictionaryAsync.rejected,
    effect: async ({ meta: { arg: name, requestId: id }, payload: responseError, error }, { dispatch }) => {
        dispatch(addNotification({
            id,
            type: 'error',
            message: `Could not delete dictionary "${name}": ${responseError ? `server responded with ${responseError.code} code` : `${error.name} ${error?.message ? `(${error.message})` : ''}`}.`,
        }));
    },
});
