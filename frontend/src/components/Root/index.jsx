import { Outlet, NavLink } from 'react-router-dom'
import * as SC from './styles'
export const Root = () => {

    return(
        <>
            <SC.HeaderContainer>
                <SC.Logo>HACKWHIZ</SC.Logo>
                <SC.LinksContainer>
                    <SC.Link to={'/login'}>Log In</SC.Link>
                    <SC.Link to={'/signup'}>Sign Up</SC.Link>
                </SC.LinksContainer>
            </SC.HeaderContainer>
            <Outlet />
        </>
    )
}