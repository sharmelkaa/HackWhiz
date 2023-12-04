import * as SC from '../../styles'
import {useDispatch, useSelector} from "react-redux";
import no_image from '../../images/no_image.png'
import {useState} from "react";
import {deleteData} from "../../../../api/deleteData";
import {Modal} from "../../../UI/Modal";
import {setUser, update, updateUserData} from "../../../../slices/userSlice";
import {postData} from "../../../../api/postData";
import {getJWT} from "../../../../helpers/manageLocalStorage";
export const MyPage = () =>  {
    const { currentUser } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [modalMessage, setModalMessage] = useState('')

    const onCloseModal = () => {
        setModalMessage('')
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('avatar', file)

        const response = await fetch(`http://localhost:3002/api/upload_avatar`, {
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

    const onDelete = async () => {
        const response = await deleteData('delete_avatar')

        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }

        dispatch(setUser(response.user))
    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            <SC.Container>
                <SC.ImgMainInfoWrapper>
                    <SC.ProfilePicture src={currentUser.avatar ? `http://localhost:3002/${currentUser.avatar}`: no_image} />
                    <form encType="multipart/form-data" onSubmit={onSubmit}>
                        <input
                            type="file"
                            name="avatar"
                            onChange={e => setFile(e.target.files[0])}
                            accept="image/*"
                        />
                        <button>SEND</button>
                    </form>
                    <button onClick={onDelete}>DELETE</button>
                    <SC.MainInfo>
                        {
                            Object.keys(currentUser).map((key, index) => <div key={index}>{key}: {currentUser[key]}</div>)
                        }
                    </SC.MainInfo>
                </SC.ImgMainInfoWrapper>

                <SC.FriendsPostsWrapper>
                    <SC.FriendsWrapper>Friends</SC.FriendsWrapper>
                    <SC.PostsWrapper>Posts</SC.PostsWrapper>
                </SC.FriendsPostsWrapper>
             </SC.Container>

            <SC.Container>
                <SC.LastPostWrapper>
                   <div>Last Post</div>
                 </SC.LastPostWrapper>
             </SC.Container>
         </>)
}