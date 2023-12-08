import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {UsersList} from "../UI/List";
import {useEffect, useState} from "react";
import {getData} from "../../api/getData";
import {Modal} from "../UI/Modal";
import {MyFriends} from "./components/MyFriends";
import {OtherUserFriends} from "./components/OtherUserFriends";

export const FriendsList = () => {
    const { currentUser } = useSelector((state) => state.user)
    const { username } = useParams()

    if (currentUser.username === username) {
        return <MyFriends />
    }

    return <OtherUserFriends />
}
