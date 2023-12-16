import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const UserLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
  color: ${({ color }) => `${color}`};
  
  &:hover {
    text-shadow: 4px 4px 9px ${({ color }) => `${color}`};
  }
`