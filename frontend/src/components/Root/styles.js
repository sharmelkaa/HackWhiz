import { styled, css } from 'styled-components'
import { NavLink } from 'react-router-dom'
import { MainContainer } from '../../styles/styles'

const textShadow = css`
    text-shadow:
        0 0 7px #fff,
        0 0 3px #fff,
        0 0 21px #fff;
`
export const Header = styled(MainContainer)`
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`
export const LinksContainer = styled.div`
    display: flex;
    gap: 25px;
`
export const Link = styled(NavLink)`
    ${textShadow};
    text-decoration: none;
    font-size: 36px;
    border: 1px solid white;
    border-radius: 10px;
    padding: 0 15px;

    &:hover {
        color: #cbe0e1;
    }
`
export const Creator = styled.div`
    font-size: 18px;
    text-shadow:
        0 0 7px #fff,
        0 0 3px #fff,
        0 0 21px #fff;
    display: flex;
    align-items: flex-end;
`
export const Greeting = styled.div`
    font-size: 36px;
    font-style: italic;
    cursor: pointer;

    &:hover {
        ${textShadow}
    }
`
