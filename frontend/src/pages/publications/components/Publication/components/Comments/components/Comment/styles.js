import styled from 'styled-components'

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
export const Content = styled.div`
    display: flex;
    gap: 10px;
`
export const Text = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 870px;
    width: 100%;
`
export const Author = styled.div`
    font-style: italic;
`
export const FirstRow = styled.div`
    display: flex;
    gap: 10px;
`
export const Edit = styled.div`
    cursor: pointer;

    &:hover {
        text-shadow:
            0 0 7px #fff,
            0 0 3px #fff,
            0 0 21px #fff;
    }
`
export const Delete = styled.div`
    cursor: pointer;

    &:hover {
        color: red;
        text-shadow:
            0 0 7px red,
            0 0 3px red,
            0 0 21px red;
    }
`

export const Manage = styled.div`
    display: flex;
    gap: 5px;
    font-style: italic;
`

export const Comment = styled.div`
    word-break: break-word;
    overflow: scroll;
`
