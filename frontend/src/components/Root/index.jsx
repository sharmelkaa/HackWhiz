import {Outlet} from 'react-router-dom'
import * as SC from './styles'
import {Button} from "../UI/Button";
import {logOut} from "../../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {useLocalStorage} from "../../hooks/useLocalStorage";

export const Root = () => {
    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const { isLogged } = useSelector((state) => state.user)
    const { getLocalStorage, removeLocalStorage } = useLocalStorage()

    const onLogOut = async () => {
        const token = getLocalStorage('JWT')

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
            removeLocalStorage('JWT')
            removeLocalStorage('username')
            dispatch(logOut())
            return
        }

        console.log('What happened?', logoutResult.message)
    }

    const username = getLocalStorage('username')

    return(
        <>
            <SC.HeaderContainer>
                {!isLogged && <SC.Logo>made by Sharmelka</SC.Logo>}
                {isLogged && <SC.Greeting onClick={() => navigate(`/${username}`)}>{`Welcome, ${username}!`}</SC.Greeting>}
                <SC.LinksContainer>
                    {!isLogged &&
                        <>
                            <SC.Link to={'/login'}>Log In</SC.Link>
                            <SC.Link to={'/signup'}>Sign Up</SC.Link>
                        </>
                    }
                    {isLogged && <Button onClick={onLogOut}>Log Out</Button> }
                </SC.LinksContainer>
            </SC.HeaderContainer>

            <Outlet />
        </>
    )
}