import {Outlet} from 'react-router-dom'
import * as SC from './styles'
import {useNavigate} from "react-router";
import {Button} from "../UI/Button";
import {logOut} from "../../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";

export const Root = () => {
    const navigate = useNavigate()
    const dispatch  = useDispatch()
    const { isLogged } = useSelector((state) => state.user)

    const onLogOut = async () => {
        const token = JSON.parse(localStorage.getItem('JWT'))

        const logoutResult = await fetch(`http://localhost:3002/api/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => data)

        if (logoutResult.message === 'User logged out') {
            localStorage.removeItem('JWT')
            dispatch(logOut())
            navigate('/', { replace: true })
            return
        }

        console.log('What happened?', logoutResult.message)
    }

    return(
        <>
            <SC.HeaderContainer>
                <SC.Logo onClick={() => {navigate('/')}}>HACKWHIZ</SC.Logo>
                <SC.LinksContainer>
                    {!isLogged &&
                        <>
                            <SC.Link to={'/login'}>Log In</SC.Link>
                            <SC.Link to={'/signup'}>Sign Up</SC.Link>
                        </>
                    }
                    {isLogged && <Button onClick={onLogOut} text='Log Out' />}
                </SC.LinksContainer>
            </SC.HeaderContainer>
            <Outlet />
        </>
    )
}