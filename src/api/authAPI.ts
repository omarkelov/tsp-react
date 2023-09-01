export interface Credentials {
    login: string;
    password: string
}

export const fetchLogin = (credentials: Credentials) => fetch('http://localhost:8081/login', {
    method: 'POST',
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${credentials.login}&password=${credentials.password}`,
    credentials: 'include'
});

export const fetchLogout = () => fetch('http://localhost:8081/logout', {
    method: 'GET',
    credentials: 'include'
});
