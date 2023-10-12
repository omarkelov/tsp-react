import { LOGIN_ADDRESS, LOGOUT_ADDRESS } from './constants';


export interface Credentials {
    login: string;
    password: string;
}

export const fetchLogin = (credentials: Credentials) => fetch(LOGIN_ADDRESS, {
    method: 'POST',
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `username=${credentials.login}&password=${credentials.password}`,
    credentials: 'include',
});

export const fetchLogout = () => fetch(LOGOUT_ADDRESS, {
    method: 'GET',
    credentials: 'include',
});
