import {useEffect} from "react";
import {UsersList} from "../../components/UI/UsersList";
import * as SC from './styles'
import {useDispatch, useSelector} from "react-redux";
import {fetchAllUsers} from "../../slices/adminSlice";
import {Modal} from "../../components/UI/Modal";
import {resetError} from "../../slices/adminSlice";

import {Loader} from "../../components/UI/Loader";
export const AdminPage = () => {
    const dispatch = useDispatch()
    const { allUsers, isLoading, error } = useSelector((state) => state.admin)

    useEffect(() => {
        if (!allUsers) {
            dispatch(fetchAllUsers())
        }
    }, []);
    const onCloseModal = () => {
        dispatch(resetError())
    }

    return(
        <SC.AdminContainer>
            <SC.AdminHeader>All Users</SC.AdminHeader>
            {error && <Modal text={error} onClose={onCloseModal} />}
            {isLoading && <Loader />}
            {allUsers && <UsersList usernames={allUsers}/>}
        </SC.AdminContainer>
    )
}

