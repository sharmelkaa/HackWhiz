import { Modal } from '../../components/UI/Modal'
import { useSelector } from 'react-redux'
import { SignupForm } from './components/SignupForm'
import { PageLink } from './styles'
import { useState } from 'react'

const SIGNUP_WARNING = 'You have to log out before signing up...'
export const SignUp = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [modalMessage, setModalMessage] = useState(null)
    const onCloseModal = () => {
        setModalMessage('')
    }
    const onOpenModal = (message) => {
        setModalMessage(message)
    }

    return (
        <>
            {modalMessage && (
                <Modal text={modalMessage} onClose={onCloseModal} />
            )}
            {currentUser && (
                <Modal text={SIGNUP_WARNING}>
                    <PageLink to={`/${currentUser.username}`}>
                        Go to my page
                    </PageLink>
                </Modal>
            )}
            {!currentUser && <SignupForm onOpenModal={onOpenModal} />}
        </>
    )
}
