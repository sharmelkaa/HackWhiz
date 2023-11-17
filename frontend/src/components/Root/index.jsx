import {Outlet} from 'react-router-dom'
import * as SC from './styles'
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {Button} from "../UI/Button";

export const Root = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.user)

    const onLogOut = () => {
        localStorage.removeItem('JWT')
        navigate('/', { replace: true })
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