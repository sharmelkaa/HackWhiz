import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 48px;
  margin: 50px auto 0;
`
export const HeaderContent = styled.div`
  color: chartreuse;
  text-shadow: 0 0 10px chartreuse, 0 0 10px chartreuse, 0 0 21px chartreuse;
`
export const LinkWrapper = styled.div`
  transform: translate(-50%, -50%);
  font-size: 48px;
  top: 50%;
  left: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
`

export const BigLink = styled(NavLink)`
  color: chartreuse;
  text-decoration: none;
  font-style: italic;
  align-self: center;
  font-size: 64px;

  &:hover {
    text-shadow: 0 0 5px #7fff6e, 0 0 5px #7fff6e, 0 0 5px #7fff6e;
  }
`