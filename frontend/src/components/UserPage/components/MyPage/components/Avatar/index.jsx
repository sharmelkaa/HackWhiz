import * as SC from './styles'
import no_image from "../../../../images/no_image.png";
import {useDispatch, useSelector} from "react-redux";
import {getJWT} from "../../../../../../helpers/manageLocalStorage";
import {setUser} from "../../../../../../slices/userSlice";
import {useState} from "react";
import {Modal} from "../../../../../UI/Modal";
import {deleteData} from "../../../../../../api/deleteData";

const AVATAR = 'avatar'
const API_URL = 'http://localhost:3002/'

export const Avatar = () => {
    const { currentUser } = useSelector((state) => state.user)
    const { avatar } = currentUser
    const dispatch = useDispatch()
    const [modalMessage, setModalMessage] = useState('')

    const onCloseModal = () => {
        setModalMessage('')
    }
    const deleteAvatar = async () => {
        const response = await deleteData('delete_avatar')

        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }

        dispatch(setUser(response.userAfterUpdate))
    }
    const editAvatar = async (e) => {
        const file = e.target.files[0]

        const formData = new FormData()
        formData.append('avatar', file)

        const response = await fetch(`${API_URL}api/upload_avatar`, {
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

        dispatch(setUser(response_json.user))
    }

    return(
        <SC.AvatarContainer>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}

            <SC.ProfilePicture src={avatar ? API_URL+avatar : no_image} />

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