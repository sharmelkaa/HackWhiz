import * as SC from './styles'
import {useSelector} from "react-redux";
import {Navigate} from "react-router";
import {manageLocalStorage} from "../../helpers/manageLocalStorage";
export const WelcomePage = () => {
    const { isLogged, currentUser } = useSelector((state) => state.user)

    if (isLogged) {
        return <Navigate to={`/${currentUser.username}`} />
    }

    return(
        <SC.WelcomeContainer>
            <SC.TagLogo>{'</>'}</SC.TagLogo>
            <SC.TextContainer>
                <SC.LargeLogo>HACKWHIZ</SC.LargeLogo>
                <SC.Slogan>CONNECT. COLLABORATE. CODE.</SC.Slogan>
            </SC.TextContainer>
        </SC.WelcomeContainer>
    )
}

