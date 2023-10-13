import { MOVIES_ADDRESS } from './constants';


export const fetchMovies = (page: number, limit: number, signal: AbortSignal) =>
    fetch(`${MOVIES_ADDRESS}?page=${page}&limit=${limit}`, {
        credentials: 'include',
        method: 'GET',
        signal,
    });

export const fetchDeleteMovie = (id: number) => fetch(`${MOVIES_ADDRESS}/${id}`, {
    credentials: 'include',
    method: 'DELETE',
});
