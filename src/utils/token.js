const KEY = 'logintoken'

export function setToken (token) {
  window.localStorage.setItem(KEY, token)
}
