import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getData} from "../../../../api/getData";
import {Modal} from "../../../UI/Modal";
import * as SC from "../../styles";
import {Publication} from "../Publication";
import {ucFirst} from "../../../UI/FormField/helpers/ucFirst";
import {useSelector} from "react-redux";

export const OtherUserPublications = () => {
    const [modalMessage, setModalMessage] = useState('')
    const [publications, setPublications] = useState([])
    const postsCopy = [...publications]
    postsCopy.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    const { username } = useParams()
    const { currentUser: { friends }, isAdmin } = useSelector((state) => state.user)
    const isFriend = isAdmin ? true : friends.map((friend) => friend.username).includes(username)

    const onCloseModal = () => {
        setModalMessage('')
    }

    const onChangePublications = (newValue) => {
        setPublications(newValue)
    }

    useEffect(() => {
        const getPublications = async() => {
            const response = await getData(`/get_posts?username=${username}&isFriend=${isFriend}`)

            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            setPublications(response.posts.posts)
        }
        getPublications()
    }, []);

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {publications &&
                <SC.Container>
                    {publications.length === 0 &&
                        <SC.NoPublications>{`${ucFirst(username)}`} has no publications yet....</SC.NoPublications>}
                    {publications.length !== 0 &&
                        <>
                            <SC.Author>{`${ucFirst(username)}\`s`} Publications</SC.Author>
                            <SC.Publications>
                                {postsCopy.map((publication) =>
                                    <Publication
                                        post={publication}
                                        key={publication._id}
                                        setPublications={onChangePublications}
                                        publications={postsCopy}
                                    />)}
                            </SC.Publications>
                        </>
                    }
                </SC.Container>
            }
        </>
    )
}