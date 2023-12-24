import {Modal} from "../Modal";
import * as SC from "./styles";

export const WarningModal = ({ text, onClose, onYes, onNo }) =>
    <Modal
        text={text}
        onClose={onClose}
    >
        <SC.Options>
            <SC.Yes onClick={onYes}>Yes</SC.Yes>
            <SC.No onClick={onClose}>No</SC.No>
        </SC.Options>
    </Modal>
