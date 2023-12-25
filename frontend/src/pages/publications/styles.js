import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Header, MainContainer } from '../../styles/styles'

export const Container = styled(MainContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`
export const Link = styled(NavLink)`
    color: #fe019a;
    font-size: 22px;
    text-decoration: none;
    font-style: italic;
    align-self: flex-end;

    &:hover {
        text-shadow:
            0 0 10px #fe019a,
            0 0 10px #fe019a,
            0 0 10px #fe019a;
    }
`

export const PublicationsHeader = styled(Header)`
    color: #4955ff;
`
export const Publications = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
`
export const Warning = styled.div`
    align-self: flex-end;
    font-size: 18px;
    font-style: italic;
    color: orangered;
`
