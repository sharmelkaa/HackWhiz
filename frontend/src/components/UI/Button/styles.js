import styled from 'styled-components'
export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  background: linear-gradient(to right, rgb(252, 74, 26), rgb(247, 183, 51));
  border: none;
  border-radius: 10px;
  padding: 5px 15px;
  font-size: 24px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
  
  &:hover {
    background: orangered;
  }
`