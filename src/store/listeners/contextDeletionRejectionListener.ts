import { startAppListening } from '../listenerMiddleware';
import { deleteContextAsync } from '../slices/contextsSlice';
import { addNotification } from '../slices/notificationsSlice';


export const startContextDeletionRejectionListener = () => startAppListening({
    actionCreator: deleteContextAsync.rejected,
    effect: async ({ meta: { arg: contextId, requestId: id }, payload: responseError, error }, { dispatch }) => {
        dispatch(addNotification({
            id,
            type: 'error',
            message: `Could not delete context with id = ${contextId}: ${responseError ? `server responded with ${responseError.code} code` : `${error.name} ${error?.message ? `(${error.message})` : ''}`}.`,
        }));
    },
});
