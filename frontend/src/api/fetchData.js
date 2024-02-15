import { getJWT } from '../helpers/manageLocalStorage'

export const fetchData = async (url, method, body = {}) => {
    try {
        const reqOptions = {
            method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJWT()}`,
            },
        }
        if (method !== 'GET') {
            reqOptions.body = JSON.stringify(body)
        }

        console.log(process.env.REACT_APP_API_URL)
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}api/${url}`,
            reqOptions
        )
        return await response.json()
    } catch (error) {
        return error
    }
}
