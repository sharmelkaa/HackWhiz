import * as SC from './styles'
import {useSelector} from "react-redux";
import {Navigate} from "react-router";
import {useLocalStorage} from "../../hooks/useLocalStorage";
export const WelcomePage = () => {
    const { isLogged } = useSelector((state) => state.user)
    const { getLocalStorage } = useLocalStorage()
    const username = getLocalStorage('username')

    if (isLogged) {
        return <Navigate to={`/${username}`} />
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

