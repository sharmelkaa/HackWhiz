import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getData} from "../../../../api/getData";
import {Modal} from "../../../UI/Modal";
import {UsersList} from "../../../UI/UsersList";
import * as SC from "../../styles";
import {ucFirst} from "../../../UI/FormField/helpers/ucFirst";
import {UserLink} from "../../../UI/UserLink";
import {Loader} from "../../../UI/Loader";

const COLOR = 'chartreuse'
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
            {friends &&
                <SC.Container>
                    {friends.length === 0 && <SC.FriendsHeader>
                        {<UserLink
                            color={COLOR}
                            to={`/${username}`}
                        >
                            {ucFirst(username)}
                        </UserLink>}
                        &nbsp;doesn't have any friends yet...
                    </SC.FriendsHeader>}
                    {friends.length !== 0 &&
                        <>
                            <SC.FriendsHeader>
                                {<UserLink
                                    color={COLOR}
                                    to={`/${username}`}
                                >
                                    {`${ucFirst(username)}\'s`}
                                </UserLink>}
                                &nbsp;Friends
                            </SC.FriendsHeader>
                            <UsersList usernames={friends} />
                        </>}
                </SC.Container>
            }
        </>
    )
}