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
            headers: this._headers,
        }).then(this._handleResponse)

    }

    addCard(name, link) {
        return fetch(`${this._url}cards`, {
            method: 'POST',
            headers: this._headers,
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
            headers: this._headers,
        })
        .then(this._handleResponse)
    }

    getUserInfo() {
        return fetch(`${this._url}users/me`, {
            method: 'GET',
            headers: this._headers,
        })
        .then(this._handleResponse)
    }

    editUserInfo(name, about) {
        return fetch(`${this._url}users/me`, {
            method: 'PATCH',
            headers: this._headers,
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
            headers: this._headers,
            body: JSON.stringify({
                avatar: link,
            }),
        })
        .then(this._handleResponse)
    }

    addLike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._handleResponse)
    }

    removeLike(id) {
        return fetch(`${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._handleResponse)
    }

    changeLikeCardStatus(id, isLiked) {
        const method = isLiked ? 'DELETE' : 'PUT';
        return fetch(`${this._url}cards/${id}/likes`, {
            method: method,
            headers: this._headers,
        })
        .then(this._handleResponse)
    }

}

const api = new Api({
    url:'https://mesto.nomoreparties.co/v1/cohort-62/',
    headers: {
      'content-type': 'application/json',
      'authorization': 'b0a7590b-647f-433a-aa05-717d75f49ba7',
    }
  })

export default api