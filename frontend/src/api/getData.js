import {manageLocalStorage} from "../helpers/manageLocalStorage";

const { getJWT } = manageLocalStorage()
export const getData = async (url) => {
    try {
        const response = await fetch(`http://localhost:3002/api/${url}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJWT()}`
            }
        })

        return await response.json();

    } catch (error) {
        console.log(error);
    }
}