import * as SC from './styles'

export const Button = ({ text, type, onClick, disabled }) =>
    <SC.Button
        onClick={onClick}
        type={type}
        disabled={disabled}
    >
        {text}
    </SC.Button>
