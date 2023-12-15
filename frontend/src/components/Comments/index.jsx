import * as SC from './styles'
import {useEffect, useState} from "react";
import {Modal} from "../UI/Modal";
import {getData} from "../../api/getData";
import {useDispatch, useSelector} from "react-redux";
import {Comment} from "./components/Comment";
import {AddCommentForm} from "./components/AddCommentForm";
import {updateComments} from "../../slices/commentsSlice";

export const Comments = ({ post, author }) => {
    const [modalMessage, setModalMessage] = useState(null)
    const { comments } = useSelector((state) => state.comments)
    const { isAdmin } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        const getComments = async() => {
            const response = await getData(`/get_comments?postID=${post}`)
            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            dispatch(updateComments(response.comments))
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
            {comments &&
                <SC.Main>
                    {!comments.length && <div>No comments yet...</div>}
                    {comments.map((comment) => <Comment comment={comment} key={comment._id} post={post} />)}
                    {!isAdmin &&
                        <AddCommentForm
                            onOpenModal={onOpenModal}
                            post={post}
                            author={author}
                        />
                    }
                </SC.Main>
            }
        </>
    )
}