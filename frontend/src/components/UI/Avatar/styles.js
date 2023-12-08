import styled from "styled-components";

export const AvatarWrapper = styled.div`
  width: 30vw;
  height: 30vw;
  max-width: 250px;
  max-height: 250px;
  border-radius: 50%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`

