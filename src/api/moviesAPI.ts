export interface Movie {
    id: number;
    videoFilePath: string;
}

export const fetchMovies = (page: number, limit: number, signal: AbortSignal) =>
    fetch(`http://localhost:8081/api/raw-movies?page=${page}&limit=${limit}`, {
        credentials: 'include',
        method: 'GET',
        signal,
    });

export const fetchDeleteMovie = (movieId: number) => fetch(`http://localhost:8081/api/raw-movies/${movieId}`, {
    credentials: 'include',
    method: 'DELETE',
});
