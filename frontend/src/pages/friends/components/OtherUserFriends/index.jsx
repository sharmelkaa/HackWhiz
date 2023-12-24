import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Modal} from "../../../../components/UI/Modal";
import {UsersList} from "../../../../components/UI/UsersList";
import * as SC from "../../styles";
import {ucFirst} from "../../../../helpers/ucFirst";
import {UserLink} from "../../../../components/UI/UserLink";
import {fetchData} from "../../../../api/fetchData";
import {NoStuff} from "../../../../styles/styles";

export const OtherUserFriends = () => {
    const [modalMessage, setModalMessage] = useState('')
    const [friends, setFriends] = useState(null)
    const { username } = useParams()
    const onCloseModal = () => {
        setModalMessage('')
    }

    useEffect(() => {
        const getFriends = async() => {
            const response = await fetchData(`friends?username=${username}`, 'GET')

            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            setFriends(response.friends.map((friend) => friend.username))
        }
        getFriends()
    }, [username]);

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {friends &&
                <SC.Container>
                    <SC.FriendsHeader>
                        <UserLink to={`/${username}`}>{`${ucFirst(username)}\'s`}</UserLink>
                        &nbsp;Friends
                    </SC.FriendsHeader>
                    {friends.length === 0 && <NoStuff>{ucFirst(username)}&nbsp;doesn't have any friends yet...</NoStuff>}
                    {friends.length !== 0 && <UsersList usernames={friends} />}
                </SC.Container>
            }
        </>
    )
}