class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.username,
        about: data.hobby,
      }),
    }).then(this._checkResponse);
  }

  setUserAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResponse);
  }

  addCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.place,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  addLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  deleteLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "api.mesto.lazutin.anton.nomoredomainsrocks.ru",
});

export default api;
