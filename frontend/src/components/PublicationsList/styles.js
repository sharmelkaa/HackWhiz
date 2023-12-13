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
  color: white;
  font-size: 32px;
  text-decoration: none;
  font-style: italic;
  text-shadow: 0 0 10px #fe019a, 0 0 10px #fe019a, 0 0 10px #fe019a;

  &:hover {
    color: #fe019a;
  }
`
export const Author = styled.div`
  color: #000ecd;;
  text-shadow: 0 0 10px #000ecd;, 0 0 10px #000ecd;, 0 0 10px #000ecd;;
  font-size: 48px;
`
export const NoPublications = styled.div`
    font-size: 36px;
`
export const Publications = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`