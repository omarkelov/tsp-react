const PROTOCOL = 'http';
const HOST = 'localhost:8081';

export const SERVER_ADDRESS = `${PROTOCOL}://${HOST}`;

const LOGIN = '/login';
const LOGOUT = '/logout';

const DICTIONARIES = '/api/movies';
const MOVIES = '/api/raw-movies';

export const LOGIN_ADDRESS = `${SERVER_ADDRESS}${LOGIN}`;
export const LOGOUT_ADDRESS = `${SERVER_ADDRESS}${LOGOUT}`;

export const DICTIONARIES_ADDRESS = `${SERVER_ADDRESS}${DICTIONARIES}`;
export const MOVIES_ADDRESS = `${SERVER_ADDRESS}${MOVIES}`;
