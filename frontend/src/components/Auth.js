export const BASE_URL = 'api.limassola.nomoreparties.sbs';

export const signup = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password, email})
    })
    .then(res => handleResponse(res));
    
}

export const signin = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    .then(res => handleResponse(res));
}

export const checkValidity = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(res => handleResponse(res));
}

function handleResponse(res) {
    if(res.ok){
        return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
}