import {Outlet} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {LoggedIn} from "./components/LoggedIn";
import {LoggedOut} from "./components/LoggedOut";
import {Modal} from "../UI/Modal";
import {resetError} from "../../slices/userSlice";

export const Root = () => {
    const { currentUser, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const onCloseModal = () => {
        dispatch(resetError())
    }

    return(
        <>
            {error && <Modal text={error} onClose={onCloseModal}/>}
            {currentUser ? <LoggedIn /> : <LoggedOut />}
            <Outlet />
        </>
    )
}