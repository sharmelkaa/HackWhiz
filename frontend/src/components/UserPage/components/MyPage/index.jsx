import * as SC from '../../styles'
import {useSelector} from "react-redux";
import {useState} from "react";
import {Modal} from "../../../UI/Modal";
import {AvatarWithEditRights} from "./components/AvatarWithEditRights";
import {PotentialFriends} from "../../../PotentialFriends";

export const MyPage = () =>  {
    const { currentUser } = useSelector((state) => state.user)
    const [modalMessage, setModalMessage] = useState('')

    const onCloseModal = () => {
        setModalMessage('')
    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            <SC.Container>

                <AvatarWithEditRights />

                <SC.MainInfo>
                    {currentUser.username}
                    {/*{*/}
                    {/*    Object.keys(currentUser).map((key, index) => <div key={index}>{key}: {currentUser[key]}</div>)*/}
                    {/*}*/}
                </SC.MainInfo>

                <SC.LinksWrapper>
                    <SC.FriendsLink to={`/${currentUser.username}/friends`}>Friends</SC.FriendsLink>
                    <SC.PostsLink to={`/${currentUser.username}/publications`}>Publications</SC.PostsLink>
                    <SC.NewPostLink to={`/new_publication`}>Create New Publication</SC.NewPostLink>
                </SC.LinksWrapper>

             </SC.Container>

            <SC.Container>
                <PotentialFriends username={currentUser.username} />
             </SC.Container>
         </>)
}