import * as SC from './styles'
export const WelcomePage = () => {
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