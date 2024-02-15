import * as SC from '../../styles'
import { useEffect, useMemo, useState } from 'react'
import { Modal } from '../../../../components/UI/Modal'
import { useParams } from 'react-router'
import { Avatar } from '../../../../components/UI/Avatar'
import no_image from '../../../../images/no_image.png'
import { useSelector } from 'react-redux'
import { fetchData } from '../../../../api/fetchData'
import { RecentPost } from './components/RecentPost'
import { MainInfo } from '../common/MainInfo'
import { Links } from '../common/Links'
import { FriendshipManage } from './components/FriendshipManage'

export const OtherUserPage = () => {
    const [otherUser, setOtherUser] = useState(null)
    const [modalMessage, setModalMessage] = useState(null)
    const { username } = useParams()
    const {
        currentUser: { friends },
        isAdmin,
    } = useSelector((state) => state.user)
    const isMyFriend = useMemo(
        () =>
            friends.filter((friend) => friend.username === username)?.length ===
            1,
        [friends, username]
    )

    useEffect(() => {
        const getUser = async () => {
            const response = await fetchData(`user?username=${username}`, 'GET')
            console.log(response)

            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            setOtherUser(response)
        }
        getUser()
    }, [username])
    const onCloseModal = () => {
        setModalMessage('')
    }

    return (
        <>
            {modalMessage && (
                <Modal text={modalMessage} onClose={onCloseModal} />
            )}
            {otherUser && (
                <>
                    <SC.Container>
                        <SC.AvatarWrapper>
                            <Avatar
                                avatar={
                                    otherUser.avatar
                                        ? process.env.REACT_APP_API_URL +
                                          otherUser.avatar
                                        : no_image
                                }
                            />
                            {!isAdmin && (
                                <FriendshipManage
                                    isMyFriend={isMyFriend}
                                    username={otherUser.username}
                                />
                            )}
                        </SC.AvatarWrapper>

                        <MainInfo user={otherUser} />
                        <Links username={otherUser.username} postForm={false} />
                    </SC.Container>

                    <SC.SecondContainer>
                        <RecentPost isMyFriend={isMyFriend} />
                    </SC.SecondContainer>
                </>
            )}
        </>
    )
}
