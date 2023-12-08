import styled from "styled-components";
import {HeaderContent} from "../AdminPage/styles";
import {Label} from "../UI/FormField/styles";

export const Container = styled.div`
  max-width: 1024px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
`
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
export const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`