class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _handleResponse(res) {
        if(res.ok){
            return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}cards`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
              },
        }).then(this._handleResponse)

    }

    addCard(name, link) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
              },
            body: JSON.stringify({
                name: name,
                link: link
            }),
        })
        .then(this._handleResponse)
    }

    deleteCard(id) {
        return fetch(`${this._url}cards/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
              },
        })
        .then(this._handleResponse)
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
              },
        })
        .then(this._handleResponse)
    }

    editUserInfo(name, about) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
              },
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        })
        .then(this._handleResponse)
    }

    setAvatar(link) {
        return fetch(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
              },
            body: JSON.stringify({
                avatar: link,
            }),
        })
        .then(this._handleResponse)
    }

    addLike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
              },
        })
        .then(this._handleResponse)
    }

    removeLike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
              },
        })
        .then(this._handleResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        const method = isLiked ? 'DELETE' : 'PUT';
        return fetch(`${this._url}cards/${id}/likes`, {
            method: method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
              }
        })
        .then(this._handleResponse)
    }

}

const api = new Api({
    url:' http://localhost:3000/',
    
  })

export default api