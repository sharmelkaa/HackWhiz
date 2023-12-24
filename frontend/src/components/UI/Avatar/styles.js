import styled from "styled-components";
export const AvatarWrapper = styled.div`
  width: ${({ size }) => size ==='big' ? '30vw' : '35px'};
  height: ${({ size }) => size ==='big' ? '30vw' : '35px'};
  max-width: 250px;
  max-height: 250px;
  border-radius: 50%;
  background-image: url(${({ avatar }) => avatar });
  background-size: cover;
  background-position: center;
`

