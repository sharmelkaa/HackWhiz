import * as SC from './styles'
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getJWT} from "../../helpers/manageLocalStorage";
import {useSelector} from "react-redux";
import {getData} from "../../api/getData";
import {postData} from "../../api/postData";
import {MyPage} from "./components/MyPage";
import {OtherUserPage} from "./components/OtherUserPage";

export const UserPage = () => {
    const { username } = useParams()
    const { currentUser, error } = useSelector((state) => state.user)
    const myPage = currentUser.username === username

    if (error) {
        return(<div>{error}</div>)
    }

    if (myPage) {
        return(<MyPage />)
    }

    return(<OtherUserPage />)

    // useEffect(() => {
    //     if (currentUser.username !== username) {
    //         const getUserData = async() => {
    //             const response = await getData(`user?username=${username}`)
    //
    //             if (response.hasOwnProperty('message')) {
    //                 setOtherUserError(response.message)
    //                 return
    //             }
    //             setOtherUserData(response)
    //         }
    //         getUserData()
    //             .catch(error => console.log(error))
    //     }
    // }, [username]);
}