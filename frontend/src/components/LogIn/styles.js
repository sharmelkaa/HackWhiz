import styled from 'styled-components'
import {NavLink} from "react-router-dom";

export const Header = styled.div`
  display: flex;
  justify-content: center;
  font-size: 52px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
`

export const LogInWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const Error = styled.span`
  color: #ffffff;
  font-size: 24px;
  font-weight: 500;
  background-color: rgba(255, 0, 0, 0.55);
  border-radius: 5px;
  text-align: center;
`

export const Warning = styled(Header)`
`

export const PageLink = styled(NavLink)`
  color: white;
  align-self: flex-end;
  font-size: 32px;
  text-decoration: none;
  font-style: italic;
  text-shadow: #39ff14 4px 4px 3px;

  &:hover {
    color: rgba(57, 255, 20, 0.8);
  }
`

export const LoggedInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const Img = styled.img`
  max-width: 23px;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(-30%, -30%);
  cursor: pointer;
`