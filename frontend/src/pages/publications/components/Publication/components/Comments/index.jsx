import * as SC from './styles'
import {useEffect, useState} from "react";
import {Modal} from "../../../../../../components/UI/Modal";
import {useDispatch, useSelector} from "react-redux";
import {Comment} from "./components/Comment";
import {AddCommentForm} from "./components/AddCommentForm";
import {updateComments} from "../../../../../../slices/commentsSlice";
import {isObjectEmpty} from "../../../../../../helpers/isObjectEmpty";
import {fetchData} from "../../../../../../api/fetchData";
import {NoStuff} from "../../../../../../styles/styles";

export const Comments = ({ post }) => {
    const [modalMessage, setModalMessage] = useState(null)
    const { comments } = useSelector((state) => state.comments)
    const { isAdmin } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const getComments = async() => {
            if (comments.hasOwnProperty(post)) {
                return
            }

            const response = await fetchData(`/get_comments?postID=${post}`, 'GET')
            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }

            const payload = {
                postID: post,
                commentsList: response
            }
            dispatch(updateComments(payload))
        }

        getComments()
    }, []);
    const onCloseModal = () => {
        setModalMessage(null)
    }
    const onOpenModal = (message) => {
        setModalMessage(message)
    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} /> }
            {(!isObjectEmpty(comments) && comments[post]) &&
                <SC.Main>
                    {comments[post].length === 0 && <NoStuff>No comments yet...</NoStuff>}
                    {comments[post].length !== 0 && comments[post].map((comment) =>
                        <Comment
                            comment={comment}
                            key={comment._id}
                            post={post}
                        />)
                    }
                    {!isAdmin &&
                        <AddCommentForm
                            onOpenModal={onOpenModal}
                            post={post}
                        />}
                </SC.Main>
            }
        </>
    )
}