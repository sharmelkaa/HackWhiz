import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getData} from "../../../../api/getData";
import {Modal} from "../../../UI/Modal";
import {UsersList} from "../../../UI/UsersList";

export const OtherUserFriends = () => {
    const [modalMessage, setModalMessage] = useState('')
    const [friends, setFriends] = useState(null)
    const { username } = useParams()
    const onCloseModal = () => {
        setModalMessage('')
    }

    useEffect(() => {
        const getFriends = async() => {
            const response = await getData(`friends?username=${username}`)

            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            setFriends(response.friends.friends.map((friend) => friend.username))
        }
        getFriends()
    }, [username]);

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {friends && <UsersList usernames={friends} />}
        </>
    )
}