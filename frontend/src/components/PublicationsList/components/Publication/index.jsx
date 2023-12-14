import * as SC from './styles'
import delete_icon from './svg/delete.svg'
import edit_icon from './svg/edit.svg'
import close_icon from './svg/close.svg'
import {useDispatch, useSelector} from "react-redux";
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
import {useParams} from "react-router";
import {Comments} from "../../../Comments";

const TITLE = 'title'
const BODY = 'body'
const DELETE_WARNING = 'Are you sure you want to delete this publication?'
export const Publication = ({ post, access, setPublications, publications }) => {
    const postID = post._id
    const [modalMessage, setModalMessage] = useState(null)
    const [warningModal, setWarningModal] = useState(null)
    const [showComments, setShowComments] = useState(false)
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const { isAdmin } = useSelector((state) => state.user)
    const { username } = useParams()
    const {
        register,
        handleSubmit,
        formState: {
            errors,
            dirtyFields
        }} = useForm({ mode: "onChange", defaultValues: { title: post.title, body: post.body, friendsOnly: post.friendsOnly } })

    const onCloseModal = () => {
        setModalMessage(null)
    }
    const onCloseWarningModal = () => {
        setWarningModal(null)
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
        if (isAdmin) {
            const admin_response = await deleteData('admin_delete_post', { postID, username })
            if (admin_response.message !== 'Post was deleted successfully') {
                setModalMessage(admin_response.message)
                return
            }
            const index = publications.map((publication) => publication._id).indexOf(postID)
            publications.splice(index, 1)
            setPublications(publications)
            return
        }

        const response = await deleteData('delete_post', { postID })
        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        dispatch(setUser(response.user))
    }

    const hideComments = () => {
        setShowComments(false)
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
                        <SC.Yes onClick={deletePost}>Yes</SC.Yes>
                        <SC.No onClick={() => setWarningModal(null)}>No</SC.No>
                    </SC.Options>
                    }
                />
            }
            <SC.Wrapper>
                {!editMode &&
                    <>
                        <SC.FirstRow>
                            <SC.Title>
                                {post.title}&nbsp;{post.friendsOnly && <SC.Span>(friends only)</SC.Span>}
                            </SC.Title>
                            {access &&
                                <SC.Icons>
                                    <SC.SVG src={edit_icon} onClick={() => setEditMode(true)}/>
                                    <SC.SVG src={delete_icon} onClick={() => setWarningModal(DELETE_WARNING)}/>
                                </SC.Icons>
                            }
                            {isAdmin && <SC.SVG src={delete_icon} onClick={() => setWarningModal(DELETE_WARNING)}/>}
                        </SC.FirstRow>
                        <SC.Body>{post.body}</SC.Body>
                        {!showComments && <SC.ShowComments onClick={() => setShowComments(true)}>Show Comments</SC.ShowComments>}
                        <Comments
                            show={showComments}
                            hideComments={hideComments}
                            author={username}
                            post={postID}
                        />
                    </>
                }
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
        </>
    )
}
