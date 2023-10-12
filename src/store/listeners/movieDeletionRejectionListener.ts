import { startAppListening } from '../listenerMiddleware';
import { deleteMovieAsync } from '../slices/moviesSlice';
import { addNotification } from '../slices/notificationsSlice';


export const startMovieDeletionRejectionListener = () => startAppListening({
    actionCreator: deleteMovieAsync.rejected,
    effect: async ({ meta: { arg: movieId, requestId: id }, payload: responseError, error }, { dispatch }) => {
        dispatch(addNotification({
            id,
            type: 'error',
            message: `Could not delete movie with id = ${movieId}: ${responseError ? `server responded with ${responseError.code} code` : `${error.name} ${error?.message ? `(${error.message})` : ''}`}.`,
        }));
    },
});
