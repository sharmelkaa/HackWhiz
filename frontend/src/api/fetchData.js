export const fetchData = async (url, method, body) => {
    return fetch(`http://localhost:3002/api/${url}`, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...body
        })
    })
}