import { DICTIONARIES_ADDRESS } from './constants';


export interface Dictionary {
    name: string;
    lang: string;
}

export const fetchDictionaries = (page: number, limit: number, signal: AbortSignal) =>
    fetch(`${DICTIONARIES_ADDRESS}?page=${page}&limit=${limit}`, {
        credentials: 'include',
        method: 'GET',
        signal,
    });

export const fetchDeleteDictionary = (name: string) => fetch(`${DICTIONARIES_ADDRESS}/${name}`, {
    credentials: 'include',
    method: 'DELETE',
});
