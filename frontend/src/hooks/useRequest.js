export const useRequest = () => {
    return async (url, method, body) => {
        try {
            const response =  await fetch(`http://localhost:3002/api/${url}`, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...body
                })
            })
            const json = await response.json()

            return { status: response.status, message: json.message }

        } catch (e) {
            console.log(e)
        }
    }
}