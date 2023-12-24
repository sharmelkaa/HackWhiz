import styled from "styled-components";
import {MainContainer, Header} from "../../styles/styles";
export const AdminContainer = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;
`
export const AdminHeader = styled(Header)`
  color: chartreuse;
  text-shadow: 0 0 10px chartreuse, 0 0 10px chartreuse, 0 0 21px chartreuse;
`