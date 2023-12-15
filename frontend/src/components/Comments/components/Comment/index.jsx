import * as SC from './styles'
import {Modal} from "../../../UI/Modal";
import {useState} from "react";
import {Avatar} from "../../../UI/Avatar";
import no_image from "../../../UserPage/images/no_image.png";
import {useDispatch, useSelector} from "react-redux";
import {updateComments} from "../../../../slices/commentsSlice";
import {deleteData} from "../../../../api/deleteData";
import {CommentEditForm} from "../CommentEditForm";

const API_URL = 'http://localhost:3002/'
const DELETE_WARNING = 'Are you sure you want to delete this comment?'
export const Comment = ({ comment, post }) => {
    const [modalMessage, setModalMessage] = useState(null)
    const [warningModal, setWarningModal] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const { currentUser, isAdmin } = useSelector((state) => state.user)
    const isMyComment = comment.author.username === currentUser.username
    const onCloseWarningModal = () => {
        setWarningModal(null)
    }
    const onCloseModal = () => {
        setModalMessage(null)
    }
    const deleteComment = async() => {
        const response = await deleteData('delete_comment', { postID: post, commentID: comment._id })
        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        dispatch(updateComments(response.updatedComments))
    }

    const closeEditForm = () => {
        setEditMode(false)
    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} /> }
            {warningModal &&
                <Modal
                    text={warningModal}
                    onClose={onCloseWarningModal}
                    children={
                        <SC.Options>
                            <SC.Yes onClick={deleteComment}>Yes</SC.Yes>
                            <SC.No onClick={() => setWarningModal(null)}>No</SC.No>
                        </SC.Options>
                    }
                />
            }
            <SC.Comment key={comment._id}>
                <SC.Content>
                    <Avatar
                        avatar={comment.author.avatar ? API_URL+comment.author.avatar : no_image}
                        size='small'
                    />
                    <SC.Text>
                        <SC.FirstRow>
                            <SC.Author>{comment.author.username}</SC.Author>
                            {(isMyComment || isAdmin) &&
                                <SC.Manage>[
                                    {!isAdmin && <><SC.Edit onClick={() => setEditMode(true)}>edit</SC.Edit> |</>}
                                    <SC.Delete onClick={() => setWarningModal(DELETE_WARNING)}>delete</SC.Delete>
                                    ]
                                </SC.Manage>
                            }
                        </SC.FirstRow>
                        {!editMode && <div>{comment.comment}</div>}
                        {editMode &&
                            <CommentEditForm
                                commentID={comment._id}
                                comment={comment.comment}
                                postID={post}
                                closeEditForm={closeEditForm}
                            />}
                    </SC.Text>
                </SC.Content>
            </SC.Comment>
        </>
    )
}