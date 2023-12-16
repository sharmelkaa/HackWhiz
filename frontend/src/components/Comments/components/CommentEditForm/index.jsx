import * as SC from './styles'
import {Modal} from "../../../UI/Modal";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import save from '../../svg/edit.svg'
import {updateComments} from "../../../../slices/commentsSlice";
import {isObjectEmpty} from "../../../../helpers/isObjectEmpty";
import {patchData} from "../../../../api/patchData";
import close from '../../svg/close.svg'
const COMMENT = 'comment'
export const CommentEditForm = ({ commentID, comment, postID, closeEditForm }) => {
    const [modalMessage, setModalMessage] = useState(null)
    const { register, handleSubmit, formState: { errors, dirtyFields }} = useForm({ mode: "onChange", defaultValues: { comment } })
    const dispatch = useDispatch()
    const onSubmit = async(data) => {
        if (isObjectEmpty(dirtyFields)) {
            setModalMessage('You have to change comment!')
            return
        }

        const body = {}
        const changes = {}
        Object.keys(dirtyFields).forEach((key) => changes[key] = data[key])
        body.postID = postID
        body.commentID = commentID
        body.changes = changes

        const response = await patchData('edit_comment', body)
        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }

        const payload = {
            postID,
            commentsList: response.updatedComments
        }
        dispatch(updateComments(payload))
        closeEditForm()
    }
    const onCloseModal = () => {
        setModalMessage(null)
    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} /> }
            <SC.EditForm onSubmit={handleSubmit(onSubmit)}>
                <SC.SendRow>
                    <SC.CommentInput
                        type='text'
                        placeholder='Сomment...'
                        {...register(COMMENT, { required: 'Comment can\'t be empty' })}
                    />
                    <SC.Button><SC.SVG src={save} /></SC.Button>
                    <SC.svgDIV onClick={closeEditForm}><SC.SVG src={close} /></SC.svgDIV>
                </SC.SendRow>
                {errors[COMMENT] && <SC.CommentError>{errors[COMMENT].message}</SC.CommentError>}
            </SC.EditForm>
        </>
    )
}