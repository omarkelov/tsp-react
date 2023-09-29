export interface Dictionary {
    name: string;
    lang: string;
}

export const fetchDictionaries = (signal: AbortSignal, page: number, limit: number) =>
    fetch(`http://localhost:8081/movies?page=${page}&limit=${limit}`, {
        credentials: 'include',
        method: 'GET',
        signal,
    });

export const fetchDeleteDictionary = (dictionaryName: string) => fetch(`http://localhost:8081/movies/${dictionaryName}`, {
    credentials: 'include',
    method: 'DELETE',
});
