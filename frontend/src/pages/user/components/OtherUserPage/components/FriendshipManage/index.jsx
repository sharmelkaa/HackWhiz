import * as SC from '../../../../styles'
import {Button} from "../../../../../../components/UI/Button";
import {fetchData} from "../../../../../../api/fetchData";
import {updateUser} from "../../../../../../slices/userSlice";
import {useDispatch} from "react-redux";
import {Modal} from "../../../../../../components/UI/Modal";
import {useState} from "react";
export const FriendshipManage = ({ isMyFriend, username }) => {
    const dispatch = useDispatch()
    const [modalMessage, setModalMessage] = useState(null)
    const onCloseModal = () => {
        setModalMessage('')
    }
    const unfollow = async() => {
        const response = await fetchData('delete_friend', 'DELETE', {username})

        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        setModalMessage(`${username} is not your friend anymore... :(`)
        dispatch(updateUser(response))
    }
    const buddyUp = async() => {
        const response = await fetchData('add_friend', 'POST', {username})

        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        setModalMessage(`${username} is your friend now! :)`)
        dispatch(updateUser(response))
    }

    return(
        <SC.ButtonWrapper>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {isMyFriend && <Button onClick={unfollow}>Unfollow</Button>}
            {!isMyFriend && <Button onClick={buddyUp}>Buddy Up</Button>}
        </SC.ButtonWrapper>
    )
}