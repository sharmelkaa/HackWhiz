import styled from "styled-components"
import {NavLink} from "react-router-dom";
export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 25px auto 0;
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
    text-shadow: 0 0 10px #fe019a, 0 0 10px #fe019a, 0 0 10px #fe019a;
  }
`
export const Author = styled.div`
  color: #4955ff;
  font-size: 48px;
`
export const PublicationsHeader = styled.div`
  font-size: 36px;
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