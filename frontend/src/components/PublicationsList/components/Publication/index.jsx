import * as SC from './styles'
import delete_icon from './svg/delete.svg'
import edit_icon from './svg/edit.svg'
import close_icon from './svg/close.svg'
import {useDispatch} from "react-redux";
import {deleteData} from "../../../../api/deleteData";
import {useState} from "react";
import {setUser} from "../../../../slices/userSlice";
import {Modal} from "../../../UI/Modal";
import {useForm} from "react-hook-form";
import {FormField} from "../../../UI/FormField";
import {Form} from "../../../UI/Form";
import {Button} from "../../../UI/Button";
import {Error} from "../../../UI/Error";
import {isObjectEmpty} from "../../../../helpers/isObjectEmpty";
import {patchData} from "../../../../api/patchData";
import {FirstRow} from "./styles";

const TITLE = 'title'
const BODY = 'body'
export const Publication = ({ post, access }) => {
    const postID = post._id
    const [modalMessage, setModalMessage] = useState(null)
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            dirtyFields
        }} = useForm({ mode: "onChange", defaultValues: { title: post.title, body: post.body } })

    const onCloseModal = () => {
        setModalMessage(null)
    }

    const onSubmit = async(data) => {
        if (isObjectEmpty(dirtyFields)) {
            setModalMessage('You have to change at least one field!')
            return
        }
        const body = {}
        const changes = {}
        Object.keys(dirtyFields).forEach((key) => changes[key] = data[key])
        body.postID = postID
        body.changes = changes

        const response = await patchData('edit_post', body)
        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        dispatch(setUser(response.user))
        setEditMode(false)
    }

    const deletePost = async() => {
        const response = await deleteData('delete_post', { postID })
        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        dispatch(setUser(response.user))
    }

    return(
        <SC.Wrapper>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} /> }
            {!editMode &&
                <>
                    <SC.FirstRow>
                        <SC.Title>
                            {post.title}&nbsp;{post.friendsOnly && <SC.Span>(friends only)</SC.Span>}
                        </SC.Title>
                        {access &&
                            <SC.Icons>
                                <SC.SVG src={edit_icon} onClick={() => setEditMode(true)}/>
                                <SC.SVG src={delete_icon} onClick={deletePost}/>
                            </SC.Icons>
                        }
                    </SC.FirstRow>
                    <SC.Body>{post.body}</SC.Body>
                    <div>Show Comments</div>
                </>}
            {editMode &&
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        type='text'
                        register={register}
                        label={TITLE}
                        validation={{required: 'Title is required'}}
                        children={<SC.Close src={close_icon} onClick={() => setEditMode(false)} />}
                    />
                    {errors[TITLE] && <Error>{errors[TITLE].message}</Error>}

                    <SC.EditWrapper>
                        <SC.Label>Body</SC.Label>
                        <SC.Text
                            rows={5}
                            {...register(BODY, { required: 'Body is required' })}
                        />
                    </SC.EditWrapper>
                    {errors[BODY] && <Error>{errors[BODY].message}</Error>}

                    <SC.CheckboxWrapper>
                        <SC.Checkbox
                            type='checkbox'
                            id='private'
                            {...register('friendsOnly')}
                        />
                        <SC.CheckboxLabel
                            htmlFor='private'
                        >
                            Friends Only
                        </SC.CheckboxLabel>
                    </SC.CheckboxWrapper>

                    <Button>Save changes</Button>
                </Form>}
        </SC.Wrapper>
    )
}
