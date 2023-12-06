import * as SC from '../../styles'
import {useEffect, useState} from "react";
import {Modal} from "../../../UI/Modal";
import {Avatar} from "../components/Avatar";
import {getData} from "../../../../api/getData";
import {useParams} from "react-router";
export const OtherUserPage = () => {
    const [user, setUser] = useState(null)
    const [modalMessage, setModalMessage] = useState('')
    const { username } = useParams()

    useEffect(() => {
        const getUser = async() => {
            const response = await getData(`user?username=${username}`)

            if (response.hasOwnProperty('messages')) {
                setModalMessage(response.message)
                return
            }
            console.log(response)
            setUser(response)
        }
        getUser()
    }, []);
    const onCloseModal = () => {
        setModalMessage('')
    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {user && <>
                <SC.Container>
                    <Avatar editRights={false}/>
                    <SC.MainInfo>
                        {Object.keys(user).map((key, index) => <div key={index}>{key}: {user[key]}</div>)}
                    </SC.MainInfo>
                    <SC.LinksWrapper>
                        <SC.FriendsLink to={`/${user.username}/friends`}>Friends</SC.FriendsLink>
                        <SC.PostsLink to={`/${user.username}/publications`}>Publications</SC.PostsLink>
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