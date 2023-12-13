import styled from "styled-components";
import {Label} from "../UI/FormField/styles";
import {NavLink} from "react-router-dom";

export const Textarea = styled.textarea`
  outline: none;
  border: none;
  border-bottom: 1px solid aliceblue;
  font-size: 24px;
  color: aliceblue;
  padding: 5px 15px;
  border-radius: 10px;
  background-color: rgba(0, 136, 255, 0.2);
  resize: none;
`
export const TextareaLabel = styled(Label)``
export const CheckboxLabel = styled(Label)`
  cursor: pointer;
`
export const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const Checkbox = styled.input`
  -webkit-appearance: none;
  appearance: none;
  font-size: 18px;
  width: 20px;
  height: 20px;
  border: 2px solid aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:before {
    content: "";
    width: 12px;
    height: 12px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 12px 12px mediumvioletred;
  }
  
  &:checked::before {
    transform: scale(1);
  }
`
export const CheckboxWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`
export const Link = styled(NavLink)`
  color: white;
  font-size: 32px;
  text-decoration: none;
  font-style: italic;
  text-shadow: 0 0 10px #0073e6, 0 0 10px #0073e6, 0 0 10px #0073e6;

  &:hover {
    color: #0073e6;
  }
`