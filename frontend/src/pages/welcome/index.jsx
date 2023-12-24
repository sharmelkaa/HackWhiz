import * as SC from './styles'
import {useSelector} from "react-redux";
import {Navigate} from "react-router";
export const WelcomePage = () => {
    const { currentUser, error } = useSelector((state) => state.user)

    if (currentUser) {
        return <Navigate to={`/${currentUser.username}`} />
    }

    if (error) {
        return
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

