import {useEffect, useState} from "react";
import {getData} from "../../api/getData";
import {Modal} from "../UI/Modal";
import {UsersList} from "../UI/UsersList";

export const AdminPage = () => {
    const [modalMessage, setModalMessage] = useState('')
    const [users, setUsers] = useState(null)

    const onCloseModal = () => {
        setModalMessage('')
    }

    useEffect(() => {
        const getUsers = async() => {
            const response = await getData('users_list')

            if (response.hasOwnProperty('messages')) {
                setModalMessage(response.message)
                return
            }

            const usernames = response.map((user) => user.username)
            setUsers(usernames)
        }
        getUsers()
    }, []);

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {users && <UsersList usernames={users}/>}
        </>
    )
}

//  проверка роли из дживити токена
// реалзоваь страницу админа
