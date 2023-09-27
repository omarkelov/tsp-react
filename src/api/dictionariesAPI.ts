export interface DictionaryItem {
    name: string;
    lang: string;
    href: string;
}

export const fetchDictionaries = (signal: AbortSignal) => fetch('http://localhost:8081/movies', {
    credentials: 'include',
    method: 'GET',
    signal,
});

export const fetchDeleteDictionary = (dictionaryName: string) => fetch(`http://localhost:8081/movies/${dictionaryName}`, {
    credentials: 'include',
    method: 'DELETE',
});
