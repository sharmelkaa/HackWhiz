import * as SC from './styles'
import no_image from "../../../../../../images/no_image.png";
import {useDispatch, useSelector} from "react-redux";
import {getJWT} from "../../../../../../helpers/manageLocalStorage";
import {updateUser} from "../../../../../../slices/userSlice";
import {useState} from "react";
import {Modal} from "../../../../../../components/UI/Modal";
import {Avatar} from "../../../../../../components/UI/Avatar";
import {fetchData} from "../../../../../../api/fetchData";

const AVATAR = 'avatar'
export const AvatarWithEditRights = () => {
    const { currentUser: { avatar } } = useSelector((state) => state.user)
    const [modalMessage, setModalMessage] = useState('')
    const dispatch = useDispatch()
    const onCloseModal = () => {
        setModalMessage('')
    }
    const deleteAvatar = async() => {
        const response = await fetchData('delete_avatar', 'DELETE')

        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        dispatch(updateUser(response))
    }
    const editAvatar = async(e) => {
        const file = e.target.files[0]

        const formData = new FormData()
        formData.append('avatar', file)

        const response = await fetch(`${process.env.REACT_APP_API_URL}api/upload_avatar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getJWT()}`,
            },
            body: formData
        })
        const response_json = await response.json()
        if (response_json.hasOwnProperty('message')) {
            setModalMessage(response_json.message)
            return
        }

        dispatch(updateUser(response_json))
    }

    return(
        <SC.AvatarContainer>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}

            <Avatar avatar={avatar ? process.env.REACT_APP_API_URL+avatar : no_image} />

            <SC.FileInput
                    id={AVATAR}
                    type='file'
                    accept='image/*'
                    onChange={e => editAvatar(e)}
            />
            <SC.ManageAvatar>
                <SC.Label htmlFor={AVATAR}>Edit</SC.Label>
                {avatar && <SC.Delete onClick={deleteAvatar}>Delete</SC.Delete>}
            </SC.ManageAvatar>
        </SC.AvatarContainer>
    )
}