export interface Dictionary {
    name: string;
    lang: string;
}

export const fetchDictionaries = (page: number, limit: number) =>
    fetch(`http://localhost:8081/api/movies?page=${page}&limit=${limit}`, {
        credentials: 'include',
        method: 'GET',
    });

export const fetchDeleteDictionary = (dictionaryName: string) => fetch(`http://localhost:8081/api/movies/${dictionaryName}`, {
    credentials: 'include',
    method: 'DELETE',
});
