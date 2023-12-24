import * as SC from '../../../../styles'
import {UsersList} from "../../../../../../components/UI/UsersList";
import {useEffect, useState} from "react";
import {Modal} from "../../../../../../components/UI/Modal";
import {fetchData} from "../../../../../../api/fetchData";

export const PotentialFriends = ({ user }) => {
    const [potentialFriends, setPotentialFriends] = useState(null)
    const [modalMessage, setModalMessage] = useState('')
    const onCloseModal = () => {
        setModalMessage('')
    }

    useEffect(() => {
        const getPotentialFriends = async() => {
            const response = await fetchData(`get_potential_friends?username=${user}`, 'GET')
            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            setPotentialFriends(response)
        }
        getPotentialFriends()
    }, [user]);

    return(
        <SC.Wrapper>
            <SC.SecondHeader>They might be your friends!</SC.SecondHeader>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {potentialFriends && <UsersList usernames={potentialFriends} />}
        </SC.Wrapper>
    )
}