import * as SC from './styles'
import close from './images/close.svg'
export const Modal = ({ children, text, onClose }) =>
    <SC.ModalWrapper onClick={onClose}>
        <SC.Modal onClick={e => e.stopPropagation()}>
            <SC.CloseIcon
                src={close}
                alt='close icon'
                onClick={onClose}
            />
            <SC.ModalText>{text}</SC.ModalText>
            {children}
        </SC.Modal>
    </SC.ModalWrapper>



