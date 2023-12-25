import * as SC from './styles'
import { ucFirst } from '../../../../../helpers/ucFirst'

export function FormField({ label, type, register, validation, children }) {
    return (
        <SC.FieldWrapper>
            <SC.Label>{ucFirst(label)}</SC.Label>
            <SC.Input
                type={type}
                {...register(label, { ...validation })}
                data-testid={label}
            />
            {children}
        </SC.FieldWrapper>
    )
}
