import * as SC from './styles'

export const Field = ({ label, value, type, placeholder, name, onChange }) => {
    return(
        <SC.FieldWrapper>
            <SC.Label>{label}</SC.Label>
            <SC.Input
                type={type}
                value={value}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
            />
        </SC.FieldWrapper>
    )
}