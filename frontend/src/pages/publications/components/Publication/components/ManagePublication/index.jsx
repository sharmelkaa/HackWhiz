import * as SC from '../../styles'
import edit_icon from "../../svg/edit.svg";
import delete_icon from "../../svg/delete.svg";
export const ManagePublication = ({ openEditMode, onOpenWarningModal }) =>
    <SC.Icons>
        <SC.SVG src={edit_icon} onClick={openEditMode}/>
        <SC.SVG src={delete_icon} onClick={onOpenWarningModal}/>
    </SC.Icons>
