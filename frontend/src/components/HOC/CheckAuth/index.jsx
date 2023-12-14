import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router";

export const CheckAuth = ({ children }) => {
    const { isLogged, isAdmin } = useSelector((state) => state.user)
    const location = useLocation()

    if (isAdmin) {
        if (location.pathname === '/new_publication') {
            return <Navigate to={'/'} replace/>
        }
    }

    if (isLogged) {
        return children
    }

    return <Navigate to={'/'} replace/>
}