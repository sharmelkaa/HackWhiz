import * as SC from './styles'

export const Button = ({ children, type, onClick, disabled }) =>
    <SC.Button
        onClick={onClick}
        type={type}
        disabled={disabled}
    >
        {children}
    </SC.Button>
