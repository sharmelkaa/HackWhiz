import * as SC from './styles'
import send from "../../svg/send.svg";
import {useForm} from "react-hook-form";
import {postData} from "../../../../api/postData";
import {useDispatch} from "react-redux";
import {updateComments} from "../../../../slices/commentsSlice";

const COMMENT = 'comment'
export const AddCommentForm = ({ onOpenModal, post, author }) => {
    const { register, reset, handleSubmit, formState: { errors }} = useForm({ mode: "onChange" })
    const dispatch = useDispatch()
    const onSubmit = async(data) => {
        data.post = post
        data.author = author

        const response = await postData('comment', data)
        if (response.hasOwnProperty('message')) {
            onOpenModal(response.message)
            return
        }
        dispatch(updateComments(response.updatedComments))
        reset()
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <SC.SendRow>
                <SC.CommentInput
                    type='text'
                    placeholder='Сomment...'
                    {...register(COMMENT, { required: 'Comment can\'t be empty' })}
                />
                <SC.Button><SC.Send src={send} /></SC.Button>
            </SC.SendRow>
            {errors[COMMENT] && <SC.CommentError>{errors[COMMENT].message}</SC.CommentError>}
        </form>
    )
}