import styled, {keyframes} from "styled-components";
import {Input} from "../UI/FormField/styles";

export const Main = styled.div`
  padding: 15px 25px;
  border: 2px solid #000ecd;;
  display: ${({show}) => show ? 'flex' : 'none'};
  flex-direction: column;
  gap: 25px;
  border-radius: 25px;
`
export const Header = styled.div`
  display: flex;
  justify-content:space-between;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
`
export const Hide = styled.div`
  font-size: 24px;
  font-style: italic;
  cursor: pointer;
  letter-spacing: 1px;
  
  &:hover {
    text-shadow:0 0 5px aliceblue, 0 0 5px aliceblue, 0 0 5px aliceblue;
  }
`
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
export const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
export const Content = styled.div`
  display: flex;
  gap: 10px;
`
export const Text = styled.div`
  display: flex;
  flex-direction: column;
`
export const Author = styled.div`
  font-style: italic;
`