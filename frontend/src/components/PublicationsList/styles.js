import styled from "styled-components"
export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 25px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`
export const Author = styled.div`
  color: #fe019a;
  text-shadow: 0 0 20px #fe019a, 0 0 20px #fe019a, 0 0 20px #fe019a;
  font-size: 48px;
`
export const Publications = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`