import {Outlet} from 'react-router-dom'
import * as SC from './styles'
import {Button} from "../UI/Button";
import {logOut} from "../../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {removeLocalStorage} from "../../helpers/manageLocalStorage";
import {postData} from "../../api/postData";


export const Root = () => {
    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const { isLogged, currentUser, isAdmin } = useSelector((state) => state.user)
    const onLogOut = async () => {
        const response = await postData('logout')

        if (response.message === 'User logged out') {
            removeLocalStorage('JWT')
            dispatch(logOut())
            return
        }

        console.log('What happened? -->', response.message)
    }

    return(
        <>
            <SC.HeaderContainer>
                {!isLogged && <SC.Logo>made by Sharmelka</SC.Logo>}
                {isLogged && <SC.Greeting onClick={() => navigate(`/${currentUser.username}`)}>{`Welcome, ${isAdmin ? 'Creator' : currentUser.username}!`}</SC.Greeting>}
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