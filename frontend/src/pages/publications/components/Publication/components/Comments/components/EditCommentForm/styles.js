import styled from 'styled-components'
import { Input } from '../../../../../../../../components/UI/Form/components/FormField/styles'

// export const CommentInput = styled(Input)`
//     width: 100%;
// `

export const CommentInput = styled.textarea`
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid aliceblue;
    font-size: 24px;
    padding: 5px 15px;
    border-radius: 10px;
    background-color: rgba(0, 136, 255, 0.2);
    resize: none;
`
export const EditForm = styled.form`
    margin-top: 5px;
`
export const SVG = styled.img`
    width: 25px;
    height: 25px;
    cursor: pointer;
    align-self: center;
`

export const svgDIV = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const CommentError = styled.div`
    font-size: 16px;
    color: red;
`
export const SendRow = styled.div`
    display: flex;
    gap: 10px;
`
export const Button = styled.button`
    outline: none;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
`
