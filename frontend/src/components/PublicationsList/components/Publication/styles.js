import styled from "styled-components";
import {Textarea, TextareaLabel, TextareaWrapper} from "../../../NewPublication/styles";
export const Wrapper = styled.div`
  padding: 25px;
  border: 1px solid aliceblue;
  background: #000e19;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
`
export const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 24px;
`
export const Body = styled.div`
  display: flex;
  font-style: oblique;
`
export const Span = styled.span`
  font-style: italic;
  font-size: 0.7em;
  color: orangered;
`
export const SVG = styled.img`
  width: 30px;
  height: 30px;
  padding: 5px;
  cursor: pointer;
  border: 1px solid transparent;
  
  &:hover {
    transition: 120ms border linear;
    border: 1px solid darkred;
    border-radius: 5px;
  }
`
export const Icons = styled.div`
  display: flex;
  gap: 5px;
`
export const Text = styled(Textarea)`
  font-style: oblique;
`
export const EditWrapper = styled(TextareaWrapper)``
export const Label = styled(TextareaLabel)``

export const CheckboxLabel = styled(Label)`
  cursor: pointer;
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
export const Close = styled.img`
  width: 30px;
  height: 30px;
  padding: 5px;
  cursor: pointer;
  position: absolute;
  right: 0;
`