import * as SC from '../../styles'
export const LoggedOut = () =>
    <SC.Header>
        <SC.Creator>made by Sharmelka</SC.Creator>
        <SC.LinksContainer>
            <SC.Link to={'/login'}>Log In</SC.Link>
            <SC.Link to={'/signup'}>Sign Up</SC.Link>
        </SC.LinksContainer>
    </SC.Header>
