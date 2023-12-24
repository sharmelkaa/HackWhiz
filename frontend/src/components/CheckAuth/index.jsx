import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router";
export const CheckAuth = ({ children }) => {
    const { currentUser, isAdmin } = useSelector((state) => state.user)
    const location = useLocation()
    const noAdminRights = !isAdmin && location.pathname === '/admin'
    const noPostAbilityForAdmin = isAdmin && location.pathname === '/new_publication'

    if (noPostAbilityForAdmin || noAdminRights) {
        return <Navigate to={'/'} replace/>
    }

    if (currentUser) {
        return children
    }

    return <Navigate to={'/'} replace/>
}