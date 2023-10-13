import { CONTEXTS_ADDRESS } from './constants';


export const fetchGetContexts = (dictionaryName: string, page: number, limit: number, signal: AbortSignal) =>
    fetch(`${CONTEXTS_ADDRESS}?movieName=${dictionaryName}&page=${page}&limit=${limit}`, {
        credentials: 'include',
        method: 'GET',
        signal,
    });

export const fetchDeleteContext = (id: number) => fetch(`${CONTEXTS_ADDRESS}/${id}`, {
    credentials: 'include',
    method: 'DELETE',
});
