const PROTOCOL = 'http';
const HOST = 'localhost:8081';

export const SERVER_ADDRESS = `${PROTOCOL}://${HOST}`;

const LOGIN = '/login';
const LOGOUT = '/logout';

const CONTEXT = '/api/context';
const CONTEXTS = '/api/contexts';
const DICTIONARIES = '/api/movies';
const MOVIES = '/api/raw-movies';
const PHRASES = '/api/phrases';

export const LOGIN_ADDRESS = `${SERVER_ADDRESS}${LOGIN}`;
export const LOGOUT_ADDRESS = `${SERVER_ADDRESS}${LOGOUT}`;

export const CONTEXT_ADDRESS = `${SERVER_ADDRESS}${CONTEXT}`;
export const CONTEXTS_ADDRESS = `${SERVER_ADDRESS}${CONTEXTS}`;
export const DICTIONARIES_ADDRESS = `${SERVER_ADDRESS}${DICTIONARIES}`;
export const MOVIES_ADDRESS = `${SERVER_ADDRESS}${MOVIES}`;
export const PHRASES_ADDRESS = `${SERVER_ADDRESS}${PHRASES}`;
