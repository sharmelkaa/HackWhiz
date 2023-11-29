import { styled } from "styled-components";
import {NavLink} from "react-router-dom";

export const HeaderContainer = styled.header`
  max-width: 1024px;
  width: 100%;
  margin: 5px auto 0;
  display: flex;
  justify-content: space-between;
`

export const LinksContainer = styled.div`
  display: flex;
  gap: 25px;
  align-items: center;
`

export const Link = styled(NavLink)`
  text-decoration: none;
  font-size: 36px;
  color: aliceblue;
  text-shadow: 0 0 7px aliceblue, 0 0 3px aliceblue, 0 0 21px aliceblue;
  border: 1px solid white;
  border-radius: 10px;
  padding: 0 15px;

  &:hover {
    color: #cbe0e1;
  }
`
export const Logo = styled.div`
  font-size: 18px;
  font-style: italic;
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 3px #fff, 0 0 21px #fff;
  display: flex;
  align-items: flex-end;
`

export const Greeting = styled(Logo)`
  font-size: 36px;
  cursor: pointer;
  text-shadow: none;
  
  &:hover {
    text-shadow: 0 0 7px #fff, 0 0 3px #fff, 0 0 21px #fff;
  }
`
