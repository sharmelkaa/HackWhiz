import styled from "styled-components";
export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 300px;
`
export const Label = styled.label`
  cursor: pointer;
  font-size: 18px;
  
  &:hover {
    text-shadow: 0 0 7px #fff, 0 0 3px #fff, 0 0 21px #fff;
  }
`
export const FileInput = styled.input`
  display: none;
`
export const Delete = styled.div`
  font-size: 18px;
  cursor: pointer;
  
  &:hover {
    text-shadow: 0 0 7px red, 0 0 3px red, 0 0 21px red;
    color: red;
  }
`
export const ManageAvatar = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`
