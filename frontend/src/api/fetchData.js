import {retry} from "@reduxjs/toolkit/query";

export const fetchData = async (url, method, body) => {
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

        const json = await response.json();
        return response.ok ? json : Promise.reject(json);
    } catch (e) {
        console.log(e)
    }
}