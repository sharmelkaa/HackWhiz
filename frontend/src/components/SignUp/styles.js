import {styled} from "styled-components";

export const Error = styled.span`
  color: #ffffff;
  font-size: 24px;
  font-weight: 500;
  background-color: rgba(255, 0, 0, 0.55);
  border-radius: 5px;
  text-align: center;
`

export const SignUpWrapper = styled.div`
  max-width: 500px;
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