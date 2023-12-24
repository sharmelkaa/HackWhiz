import {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router";
import {Modal} from "../../../../components/UI/Modal";
import * as SC from "../../styles";
import {Publication} from "../Publication";
import {ucFirst} from "../../../../helpers/ucFirst";
import {useSelector} from "react-redux";
import {UserLink} from "../../../../components/UI/UserLink";
import {dateDescSort} from "../../../../helpers/dateDescSort";
import {fetchData} from "../../../../api/fetchData";
import {NoStuff} from "../../../../styles/styles";

export const OtherUserPublications = () => {
    const [modalMessage, setModalMessage] = useState('')
    const [publications, setPublications] = useState(null)
    const sortedPublications = dateDescSort(publications)
    const { username } = useParams()
    const { currentUser: { friends }, isAdmin } = useSelector((state) => state.user)
    const isMyFriend = useMemo(() => {
        if (isAdmin) {
            return true
        }
        return friends.filter((friend) => friend.username === username)?.length === 1
    }, [friends, username])
    const onCloseModal = () => {
        setModalMessage('')
    }
    const onChangePublications = (newValue) => {
        setPublications(newValue)
    }
    useEffect(() => {
        const getPublications = async() => {
            const response = await fetchData(`/get_posts?username=${username}&isFriend=${isMyFriend}`, 'GET')

            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            setPublications(response.posts)
        }
        getPublications()
    }, [username, isMyFriend]);

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {publications &&
                <SC.Container>
                    <SC.PublicationsHeader>
                        <UserLink to={`/${username}`}>{`${ucFirst(username)}\`s`}</UserLink>&nbsp;Publications
                    </SC.PublicationsHeader>
                    {publications.length === 0 && <NoStuff>{ucFirst(username)}&nbsp;has no publications yet....</NoStuff>}
                    {!isMyFriend && <SC.Warning>*this user may has private publications. Buddy up with him to see them!</SC.Warning>}
                    {publications.length !== 0 &&
                        <SC.Publications>
                            {sortedPublications.map((publication) =>
                                <Publication
                                    post={publication}
                                    key={publication._id}
                                    setPublications={onChangePublications}
                                    publications={sortedPublications}
                                />)
                            }
                        </SC.Publications>
                    }
                </SC.Container>
            }
        </>
    )
}