import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import * as SC from './styles'
import { updateUser } from '../../../../slices/userSlice'
import { Modal } from '../../../../components/UI/Modal'
import { fetchData } from '../../../../api/fetchData'
import { EditPublicationForm } from './components/EditPublicationForm'
import { WarningModal } from '../../../../components/UI/WarningModal'
import { PublicationContent } from './components/PublicationContent'

const DELETE_WARNING = 'Are you sure you want to delete this publication?'
export function Publication({ post, access, setPublications, publications }) {
    const postID = post._id
    const [modalMessage, setModalMessage] = useState(null)
    const [warningModal, setWarningModal] = useState(null)
    const dispatch = useDispatch()
    const [editMode, setEditMode] = useState(false)
    const { isAdmin } = useSelector((state) => state.user)

    const { username } = useParams()
    const onOpenModal = (message) => {
        setModalMessage(message)
    }
    const onCloseModal = () => {
        setModalMessage(null)
    }
    const openEditForm = () => {
        setEditMode(true)
    }
    const closeEditForm = () => {
        setEditMode(false)
    }
    const onOpenWarningModal = () => {
        setWarningModal(DELETE_WARNING)
    }
    const onCloseWarningModal = () => {
        setWarningModal(null)
    }
    const deletePost = async () => {
        if (isAdmin) {
            const adminResponse = await fetchData(
                'admin_delete_post',
                'DELETE',
                { postID, username }
            )
            if (adminResponse.hasOwnProperty('message')) {
                setModalMessage(adminResponse.message)
                return
            }
            const index = publications
                .map((publication) => publication._id)
                .indexOf(postID)
            publications.splice(index, 1)
            setPublications(publications)
            return
        }

        const response = await fetchData('delete_post', 'DELETE', { postID })
        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        dispatch(updateUser(response))
    }

    return (
        <SC.Wrapper>
            {modalMessage && (
                <Modal text={modalMessage} onClose={onCloseModal} />
            )}
            {warningModal && (
                <WarningModal
                    text={warningModal}
                    onClose={onCloseWarningModal}
                    onYes={deletePost}
                />
            )}
            {!editMode && (
                <PublicationContent
                    post={post}
                    access={access}
                    onOpenWarningModal={onOpenWarningModal}
                    openEditForm={openEditForm}
                />
            )}
            {editMode && (
                <EditPublicationForm
                    post={post}
                    onOpenModal={onOpenModal}
                    closeEditForm={closeEditForm}
                />
            )}
        </SC.Wrapper>
    )
}
