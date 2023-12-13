import {getJWT} from "../helpers/manageLocalStorage";
export const patchData = async (url, body) => {
    try {
        const response = await fetch(`http://localhost:3002/api/${url}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJWT()}`
            },
            body: JSON.stringify(body)
        })

        return await response.json();

    } catch (error) {
        console.log(error);
    }
}