import * as SC from './styles'
import hide_pw from './svg/closed_eye.svg'
import show_pw from './svg/opened_eye.svg'
export const PasswordVisibility = ({ showPassword, onClick }) =>
    <SC.Img
        src={showPassword ? hide_pw : show_pw}
        onClick={onClick}
    />