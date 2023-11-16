import { Outlet, NavLink } from 'react-router-dom'
import * as SC from './styles'
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "../UI/Button";
import {logOut} from "../../slices/userSlice";
export const Root = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)

    const onLogOut = () => {
        localStorage.removeItem('user')
        dispatch(logOut())
    }

    return(
        <>
            <SC.HeaderContainer>
                <SC.Logo onClick={() => {navigate('/')}}>HACKWHIZ</SC.Logo>
                <SC.LinksContainer>
                    {!user && <>
                        <SC.Link to={'/login'}>Log In</SC.Link>
                        <SC.Link to={'/signup'}>Sign Up</SC.Link>
                    </>}
                    {user && <Button onClick={onLogOut} text='Log Out' />}
                </SC.LinksContainer>
            </SC.HeaderContainer>
            <Outlet />
        </>
    )
}