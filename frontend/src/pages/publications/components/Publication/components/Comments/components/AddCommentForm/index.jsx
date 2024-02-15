import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as SC from './styles'
import send from '../../svg/send.svg'
import { updateComments } from '../../../../../../../../slices/commentsSlice'
import { fetchData } from '../../../../../../../../api/fetchData'

const COMMENT = 'comment'
export const commentValidation = {
    required: "Comment can't be empty",
    maxLength: {
        value: 8000,
        message: 'Comment can contain a maximum of 8000 characters',
    },
    validate: (value) =>
        /^(?!\s*$).*$/.test(value) || "Comment can't just consist of spaces",
}

export function AddCommentForm({ onOpenModal, post }) {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onChange' })
    const {
        currentUser: { username },
    } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        data.post = post
        data.author = username

        const response = await fetchData('comment', 'POST', data)
        if (response.hasOwnProperty('message')) {
            onOpenModal(response.message)
            return
        }

        const payload = {
            postID: post,
            commentsList: response,
        }
        dispatch(updateComments(payload))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <SC.SendRow>
                <SC.CommentInput
                    type="text"
                    placeholder="Сomment..."
                    {...register(COMMENT, { ...commentValidation })}
                />
                <SC.Button>
                    <SC.Send src={send} />
                </SC.Button>
            </SC.SendRow>
            {errors[COMMENT] && (
                <SC.CommentError>{errors[COMMENT].message}</SC.CommentError>
            )}
        </form>
    )
}
