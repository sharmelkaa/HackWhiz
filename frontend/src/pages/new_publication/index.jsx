import * as SC from './styles'
import { useState } from 'react'
import { Modal } from '../../components/UI/Modal'
import { useSelector } from 'react-redux'
import { NewPublicationForm } from './components/NewPublicationForm'

export const NewPublication = () => {
    const [modalMessage, setModalMessage] = useState(null)
    const success = modalMessage === 'Post published!'
    const {
        currentUser: { username },
    } = useSelector((state) => state.user)
    const onOpenModal = (message) => {
        setModalMessage(message)
    }
    const onCloseModal = () => {
        setModalMessage('')
    }

    return (
        <>
            {modalMessage && (
                <Modal text={modalMessage} onClose={onCloseModal}>
                    {success && (
                        <SC.Link to={`/${username}/publications`}>
                            My publications
                        </SC.Link>
                    )}
                </Modal>
            )}
            <NewPublicationForm onOpenModal={onOpenModal} />
        </>
    )
}
