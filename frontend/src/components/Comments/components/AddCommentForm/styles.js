import styled from "styled-components";
import {Input} from "../../../UI/FormField/styles";

export const CommentInput = styled(Input)`
  width: 100%;
`
export const CommentError = styled.div`
  font-size: 16px;
  color: red;
`
export const Send = styled.img`
  cursor: pointer
`
export const SendRow = styled.div`
  display: flex;
  gap: 10px;
`
export const Button = styled.button`
  outline: none;
  background: none;
  border: none;
`