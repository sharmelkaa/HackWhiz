import styled from "styled-components";
export const Options = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
  font-size: 24px;
  font-style: italic;
`
export const No = styled.div`
  color: black;
  cursor: pointer;
  padding: 5px;
  border: 2px solid transparent;
  
  &:hover {
    font-weight: bold;
  }
`
export const Yes = styled(No)`
  color: black;
  cursor: pointer;
  padding: 5px;

  &:hover {
    font-weight: normal;
    transition: 120ms border linear;
    border: 2px solid red;
    border-radius: 5px;
    background-color: rgba(255, 0, 0, 0.58);
  }
`