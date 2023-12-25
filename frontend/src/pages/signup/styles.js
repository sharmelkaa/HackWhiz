import { styled } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const PageLink = styled(NavLink)`
    color: chartreuse;
    align-self: center;
    font-size: 32px;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        color: rgba(127, 255, 0, 0.72);
    }
`
