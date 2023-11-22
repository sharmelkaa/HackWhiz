import styled from 'styled-components'

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`

export const Label = styled.label`
  color: aliceblue;
  font-size: 24px;
`

export const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid aliceblue;
  font-size: 24px;
  color: aliceblue;
  padding: 5px 15px;
  border-radius: 10px;
  background-color: rgba(0, 136, 255, 0.2);
`