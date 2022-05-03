import { BASE_URL } from "./constants";

// метод проверки ошибок
function checkResponse(res) {
  if (res.status >= 200 && res.status < 300) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// регистрация нового пользователя
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then(checkResponse)
}

// авторизация пользователя
export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then(checkResponse)
}

// запрос на роут аутентификации
export const sendToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(checkResponse)
}
