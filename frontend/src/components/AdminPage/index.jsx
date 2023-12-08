import {useEffect, useState} from "react";
import {getData} from "../../api/getData";
import {Modal} from "../UI/Modal";
import {UsersList} from "../UI/List";
import * as SC from './styles'
import {useSelector} from "react-redux";
import {Navigate} from "react-router";
import {NavLink} from "react-router-dom";
import {isDraft} from "@reduxjs/toolkit";
export const AdminPage = () => {
    const [modalMessage, setModalMessage] = useState('')
    const [users, setUsers] = useState(null)
    const { currentUser, isAdmin } = useSelector((state) => state.user)

    const onCloseModal = () => {
        setModalMessage('')
    }

    useEffect(() => {
        const getUsers = async() => {
            const response = await getData('users_list')

            if (response.hasOwnProperty('message')) {
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
            {modalMessage === 'You don\'t have administrative rights' && <Modal text={modalMessage} onClose={onCloseModal}/>}
            {!isAdmin &&
                <SC.LinkWrapper>
                    <SC.BigLink to={`/${currentUser.username}`}>Go To My Page --></SC.BigLink>
                </SC.LinkWrapper>
            }
            {users &&
                <>
                    <SC.Header>
                        <SC.HeaderContent>All Users</SC.HeaderContent>
                        <SC.HeaderContent>↓</SC.HeaderContent>
                    </SC.Header>
                    <UsersList usernames={users}/>
                </>
            }
        </>
    )
}

