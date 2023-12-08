import {styled} from "styled-components";
import {NavLink} from "react-router-dom";
import {FormHeader} from "../UI/FormHeader/styles";
export const Img = styled.img`
  max-width: 23px;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(-30%, -30%);
  cursor: pointer;
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
export const Warning = styled(FormHeader)``
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