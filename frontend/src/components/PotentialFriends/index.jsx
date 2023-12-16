import * as SC from './styles'
import {UsersList} from "../UI/UsersList";
import {useEffect, useState} from "react";
import {getData} from "../../api/getData";
import {Modal} from "../UI/Modal";

export const PotentialFriends = ({ username }) => {
    const [potentialFriends, setPotentialFriends] = useState(null)
    const [modalMessage, setModalMessage] = useState('')

    const onCloseModal = () => {
        setModalMessage('')
    }

    useEffect(() => {
        const getPotentialFriends = async() => {
            const response = await getData(`get_potential_friends?username=${username}`)
            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            setPotentialFriends(response)
        }
        getPotentialFriends()
    }, [username]);

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {potentialFriends &&
                <SC.Wrapper>
                    <SC.Header>They might be your friends!</SC.Header>
                    <UsersList usernames={potentialFriends} />
                </SC.Wrapper>}
        </>
    )
}