import {getJWT} from "../helpers/manageLocalStorage";

export const deleteData = async (url, body={}) => {
    try {
        const response = await fetch(`http://localhost:3002/api/${url}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getJWT()}`
            },
            body: JSON.stringify(body)
        })

        return await response.json();

    } catch (error) {
        console.log(error);
    }
}