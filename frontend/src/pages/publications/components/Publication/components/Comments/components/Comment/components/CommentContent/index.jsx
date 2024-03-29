import { useSelector } from 'react-redux'
import { useState } from 'react'
import * as SC from '../../styles'
import { Avatar } from '../../../../../../../../../../components/UI/Avatar'
import no_image from '../../../../../../../../../../images/no_image.png'
import { EditCommentForm } from '../../../EditCommentForm'

const DELETE_WARNING = 'Are you sure you want to delete this comment?'
export function CommentContent({ comment, post, onOpenWarningModal }) {
    const { currentUser, isAdmin } = useSelector((state) => state.user)
    const isMyComment = comment.author.username === currentUser.username
    const [editMode, setEditMode] = useState(false)

    const closeEditForm = () => {
        setEditMode(false)
    }

    return (
        <SC.Content key={comment._id}>
            <Avatar
                avatar={
                    comment.author.avatar
                        ? process.env.REACT_APP_API_URL + comment.author.avatar
                        : no_image
                }
                size="small"
            />
            <SC.Text>
                <SC.FirstRow>
                    <SC.Author>{comment.author.username}</SC.Author>
                    {(isMyComment || isAdmin) && (
                        <SC.Manage>
                            [
                            {!isAdmin && (
                                <SC.Edit onClick={() => setEditMode(true)}>
                                    edit
                                </SC.Edit>
                            )}
                            |
                            <SC.Delete
                                onClick={() =>
                                    onOpenWarningModal(DELETE_WARNING)
                                }
                            >
                                delete
                            </SC.Delete>
                            ]
                        </SC.Manage>
                    )}
                </SC.FirstRow>
                {!editMode && <SC.Comment>{comment.comment}</SC.Comment>}
                {editMode && (
                    <EditCommentForm
                        commentID={comment._id}
                        comment={comment.comment}
                        postID={post}
                        closeEditForm={closeEditForm}
                    />
                )}
            </SC.Text>
        </SC.Content>
    )
}
