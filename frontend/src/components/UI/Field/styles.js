import styled from 'styled-components'

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Label = styled.label`
  color: aliceblue;
  font-family: 'Handjet', sans-serif;
  font-size: 24px;
`

export const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid aliceblue;
  background-color: rgba(0, 136, 255, 0.2);
  font-family: 'Handjet', sans-serif;
  font-size: 24px;
  color: aliceblue;
  padding: 5px 15px;
  border-radius: 10px;
`