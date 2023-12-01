import {Outlet} from 'react-router-dom'
import * as SC from './styles'
import {Button} from "../UI/Button";
import {logOut} from "../../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {getJWT, removeLocalStorage} from "../../helpers/manageLocalStorage";


export const Root = () => {
    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const { isLogged, currentUser } = useSelector((state) => state.user)

    const onLogOut = async () => {
        const token = getJWT()

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
            dispatch(logOut())
            return
        }

        console.log('What happened?', logoutResult.message)
    }

    return(
        <>
            <SC.HeaderContainer>
                {!isLogged && <SC.Logo>made by Sharmelka</SC.Logo>}
                {isLogged && <SC.Greeting onClick={() => navigate(`/${currentUser.username}`)}>{`Welcome, ${currentUser.username}!`}</SC.Greeting>}
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