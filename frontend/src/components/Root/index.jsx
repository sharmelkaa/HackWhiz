import { Outlet, NavLink } from 'react-router-dom'
import * as SC from './styles'
import {useNavigate} from "react-router";
export const Root = () => {
    const navigate = useNavigate()

    return(
        <>
            <SC.HeaderContainer>
                <SC.Logo onClick={() => {navigate('/')}}>HACKWHIZ</SC.Logo>
                <SC.LinksContainer>
                    <SC.Link to={'/login'}>Log In</SC.Link>
                    <SC.Link to={'/signup'}>Sign Up</SC.Link>
                </SC.LinksContainer>
            </SC.HeaderContainer>
            <Outlet />
        </>
    )
}