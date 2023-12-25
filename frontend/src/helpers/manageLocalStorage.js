export const setLocalStorage = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value))
export const getJWT = () => JSON.parse(localStorage.getItem('JWT'))
export const removeLocalStorage = (key) => localStorage.removeItem(key)
