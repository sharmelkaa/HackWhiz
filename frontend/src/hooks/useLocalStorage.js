export const useLocalStorage = () => {
    const setLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    const getLocalStorage = (key) => {
        return JSON.parse(localStorage.getItem(key))
    }

    const removeLocalStorage = (key) => {
        localStorage.removeItem(key)
    }

    return {
        setLocalStorage,
        getLocalStorage,
        removeLocalStorage
    }
}