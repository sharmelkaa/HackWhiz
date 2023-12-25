import { styled } from 'styled-components'
import { MainContainer } from '../../styles/styles'

export const WelcomeContainer = styled(MainContainer)`
    display: flex;
    justify-content: center;
    gap: 25px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
export const Font = styled.div`
    font-family: 'Hacked', sans-serif;
    color: #fff;
    text-shadow:
        0 0 5px #fff,
        0 0 10px #fff,
        0 0 15px #0073e6,
        0 0 20px #0073e6,
        0 0 25px #0073e6,
        0 0 30px #0073e6,
        0 0 35px #0073e6;
`

export const TagLogo = styled(Font)`
    padding-top: 25px;
    font-weight: bold;
    font-size: 112px;
`
export const LargeLogo = styled(Font)`
    font-size: 145px;
`
export const Slogan = styled(Font)`
    font-size: 42px;
    font-style: italic;
    text-shadow: none;
    text-align: left;
`
export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
`
