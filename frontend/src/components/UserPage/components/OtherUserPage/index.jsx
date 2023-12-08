import * as SC from '../../styles'
import {useEffect, useState} from "react";
import {Modal} from "../../../UI/Modal";
import {getData} from "../../../../api/getData";
import {useParams} from "react-router";
import {Avatar} from "../../../UI/Avatar";
import no_image from '../../images/no_image.png'
import {Button} from "../../../UI/Button";
import {useDispatch, useSelector} from "react-redux";
import {postData} from "../../../../api/postData";
import {setUser} from "../../../../slices/userSlice";
import {deleteData} from "../../../../api/deleteData";

const AVATAR = 'avatar'
const API_URL = 'http://localhost:3002/'
export const OtherUserPage = () => {
    const [otherUser, setOtherUser] = useState(null)
    const [modalMessage, setModalMessage] = useState('')
    const { username } = useParams()
    const { currentUser: { friends } } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const isMyFriend = friends.map((friend) => friend.username).includes(username)

    useEffect(() => {
        const getUser = async() => {
            const response = await getData(`user?username=${username}`)

            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            setOtherUser(response)
        }
        getUser()
    }, [username]);
    const onCloseModal = () => {
        setModalMessage('')
    }
    const unfollow = async() => {
        const response = await deleteData('delete_friend', { username })

        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        setModalMessage(`${username} is not your friend anymore... :(`)
        dispatch(setUser(response.user))
    }
    const buddyUp = async() => {
        const response = await postData('add_friend', { username })

        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        setModalMessage(`${username} is your friend now! :)`)
        dispatch(setUser(response.user))
    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {otherUser && <>
                <SC.Container>
                    <SC.Wrapper>
                        <Avatar image={otherUser.avatar ? API_URL+AVATAR : no_image} />
                        <SC.ButtonWrapper>
                            {isMyFriend && <Button onClick={unfollow}>Unfollow</Button>}
                            {!isMyFriend && <Button onClick={buddyUp}>Buddy Up</Button>}
                        </SC.ButtonWrapper>
                    </SC.Wrapper>
                    <SC.MainInfo>
                        {otherUser.username}
                        {/*{Object.keys(user).map((key, index) => <div key={index}>{key}: {user[key]}</div>)}*/}
                    </SC.MainInfo>
                    <SC.LinksWrapper>
                        <SC.FriendsLink to={`/${otherUser.username}/friends`}>Friends</SC.FriendsLink>
                        <SC.PostsLink to={`/${otherUser.username}/publications`}>Publications</SC.PostsLink>
                    </SC.LinksWrapper>
                </SC.Container>
                <SC.Container>
                    <SC.LastPostWrapper>
                        <div>Last Post</div>
                    </SC.LastPostWrapper>
                </SC.Container>
            </>}
        </>)
}