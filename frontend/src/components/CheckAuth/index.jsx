import {useSelector} from "react-redux";
import {Navigate} from "react-router";

export const CheckAuth = ({ children }) => {
    const { isLogged } = useSelector((state) => state.user)

    if (isLogged) {
        return children
    }

    return <Navigate to={'/'} replace/>
}