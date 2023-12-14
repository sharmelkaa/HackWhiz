import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1;
  cursor: pointer;
`
export const Modal = styled.div`
  cursor: default;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #0073e6, 0 0 20px #0073e6, 0 0 25px #0073e6, 0 0 30px #0073e6, 0 0 35px #0073e6;
  background: white;
  opacity: 0.8;
  padding: 5px 20px 5px 15px;
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: auto;
`

export const ModalText = styled.div`
  color: black;
  font-weight: bold;
  text-align: center;
  font-size: 32px;
`

export const CloseIcon = styled.img`
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
  max-width: 10px;
  width: 100%;
`