import * as SC from '../../../../styles'
import {ucFirst} from "../../../../../../helpers/ucFirst";
import {Comments} from "../../../../../publications/components/Publication/components/Comments";
import {useEffect, useState} from "react";
import {fetchData} from "../../../../../../api/fetchData";
import {useParams} from "react-router";
import {Modal} from "../../../../../../components/UI/Modal";
import {Body, ManageComments, Span, Title} from "../../../../../publications/components/Publication/styles";
import {NoStuff} from "../../../../../../styles/styles";
export const RecentPost = ({ isMyFriend }) => {
    const [recentPost, setRecentPost] = useState(null)
    const [showComments, setShowComments] = useState(false)
    const [modalMessage, setModalMessage] = useState(null)
    const { username } = useParams()
    const onCloseModal = () => {
        setModalMessage('')
    }
    const toggleComments = () => {
        setShowComments(prevState => !prevState)
    }

    useEffect(() => {
        const getRecentPost = async() => {
            const response = await fetchData(`get_recent_post?username=${username}&isFriend=${isMyFriend}`, 'GET')

            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }

            setRecentPost(response)
        }
        getRecentPost()
    }, [username, isMyFriend]);

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {recentPost &&
                <SC.Wrapper>
                    <SC.SecondHeader>Recent Post</SC.SecondHeader>
                    {recentPost.length === 0 && <NoStuff>{ucFirst(username)} has no publications yet...</NoStuff>}
                    {recentPost.length !== 0 &&
                        <>
                            <Title>{recentPost.title}&nbsp;{recentPost.friendsOnly && <Span>(friends only)</Span>}</Title>
                            <Body>{recentPost.body}</Body>
                            <ManageComments onClick={toggleComments}>
                                {showComments ? 'Hide Comments' : 'Show Comments'}
                            </ManageComments>
                            {showComments &&
                                <Comments post={recentPost._id} />
                            }
                        </>
                    }
                </SC.Wrapper>
            }
        </>
    )
}