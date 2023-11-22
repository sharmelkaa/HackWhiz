import * as SC from './styles'
import {useEffect, useState} from "react";

export const UserPage = () => {
    const username = JSON.parse(localStorage.getItem('username'))
    const [error, setError] = useState('')
    const [data, setData] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3002/api/user?username=${username}`)
            .then((response) => {
                if (!response.ok) {
                    response.json().then((error) => setError(error.message))
                    return
                }
                response.json().then((userData) => setData(userData))
            })
    }, [username]);

    return(
        <>
            <SC.H>ЭТО СТРАНИЦА ПОЛЬЗОВАТЕЛЯ</SC.H>
            {error && <SC.H>{error}</SC.H>}
            {data && <SC.H>{data.username}</SC.H>}
        </>
    )
}