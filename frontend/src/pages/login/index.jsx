import {Modal} from "../../components/UI/Modal";
import {useDispatch, useSelector} from "react-redux";
import {LoginForm} from "./components/LoginForm";
import {loginUser, resetError} from "../../slices/userSlice";
import {Loader} from "../../components/UI/Loader";
import {Navigate} from "react-router";

export const LogIn = () => {
    const { currentUser, isLoading, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const onCloseModal = () => {
        dispatch(resetError())
    }

    const onSubmit = (userCredentials) => {
        dispatch(loginUser(userCredentials))
    }

    return(
        <>
            {currentUser && <Navigate to={`/${currentUser.username}`} />}
            {error && <Modal text={error} onClose={onCloseModal} />}
            {isLoading && <Loader />}
            {!currentUser && <LoginForm onSubmit={onSubmit}/>}
        </>
    )
}