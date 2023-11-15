import * as SC from './styles'

export const Modal = ({ children, text, onClose }) => {

    return(
        <SC.ModalWrapper>
            <SC.Modal>
                <SC.ModalText>{text}</SC.ModalText>
                {children}
                <SC.CloseModal onClick={onClose}>x</SC.CloseModal>
            </SC.Modal>
       </SC.ModalWrapper>)
}



