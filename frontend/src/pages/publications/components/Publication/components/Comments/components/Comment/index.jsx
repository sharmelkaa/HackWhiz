import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../../../../../../../../components/UI/Modal'
import { updateComments } from '../../../../../../../../slices/commentsSlice'
import { fetchData } from '../../../../../../../../api/fetchData'
import { WarningModal } from '../../../../../../../../components/UI/WarningModal'
import { CommentContent } from './components/CommentContent'

export function Comment({ comment, post }) {
    const [modalMessage, setModalMessage] = useState(null)
    const [warningModal, setWarningModal] = useState(null)
    const dispatch = useDispatch()
    const onCloseWarningModal = () => {
        setWarningModal(null)
    }
    const onOpenWarningModal = (message) => {
        setWarningModal(message)
    }
    const onCloseModal = () => {
        setModalMessage(null)
    }
    const deleteComment = async () => {
        const response = await fetchData('delete_comment', 'DELETE', {
            postID: post,
            commentID: comment._id,
        })
        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }

        const payload = {
            postID: post,
            commentsList: response,
        }
        dispatch(updateComments(payload))
    }

    return (
        <>
            {modalMessage && (
                <Modal text={modalMessage} onClose={onCloseModal} />
            )}
            {warningModal && (
                <WarningModal
                    text={warningModal}
                    onClose={onCloseWarningModal}
                    onYes={deleteComment}
                />
            )}
            <CommentContent
                comment={comment}
                post={post}
                onOpenWarningModal={onOpenWarningModal}
            />
        </>
    )
}
