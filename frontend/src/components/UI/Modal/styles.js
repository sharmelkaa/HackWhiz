import styled from "styled-components";

const textColors = {
    normal: 'black',
    warning: 'darkred',
    success: '#2CFF2CFF'
}

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`
export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: white;
  border: 1px solid white;
  padding: 15px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  border-radius: 15px;
`
export const ModalText = styled.div`
  color: black;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
  margin-right: 15px;
`

export const CloseModal = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
`