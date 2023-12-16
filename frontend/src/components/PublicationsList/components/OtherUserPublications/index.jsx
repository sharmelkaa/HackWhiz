import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getData} from "../../../../api/getData";
import {Modal} from "../../../UI/Modal";
import * as SC from "../../styles";
import {Publication} from "../Publication";
import {ucFirst} from "../../../UI/FormField/helpers/ucFirst";
import {useSelector} from "react-redux";
import {UserLink} from "../../../UI/UserLink";
import {dateDescSort} from "../../../../helpers/dateDescSort";

const COLOR = '#4955ff'
export const OtherUserPublications = () => {
    const [modalMessage, setModalMessage] = useState('')
    const [publications, setPublications] = useState(null)
    const sortedPublications = dateDescSort(publications)
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
    }, [username, isFriend]);

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {publications &&
                <SC.Container>
                    {publications.length === 0 &&
                        <SC.PublicationsHeader>
                            <UserLink
                                color={COLOR}
                                to={`/${username}`}
                            >
                                {ucFirst(username)}
                            </UserLink>
                            &nbsp;has no publications yet....</SC.PublicationsHeader>}

                    {publications.length !== 0 &&
                        <>
                            <SC.Author>
                                <UserLink
                                    color={COLOR}
                                    to={`/${username}`}
                                >
                                    {`${ucFirst(username)}\`s`}
                                </UserLink>
                                &nbsp;Publications
                            </SC.Author>
                            {!isFriend && <SC.Warning>*this user may has private publications. Buddy up with him to see them!</SC.Warning>}
                            <SC.Publications>
                                {sortedPublications.map((publication) =>
                                    <Publication
                                        post={publication}
                                        key={publication._id}
                                        setPublications={onChangePublications}
                                        publications={sortedPublications}
                                    />)}
                            </SC.Publications>
                        </>
                    }
                </SC.Container>
            }
        </>
    )
}