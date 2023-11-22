import * as SC from "../FormField/styles";
import {ucFirst} from "./helpers/ucFirst";

export const FormField = ({ label, type, register, validation, children }) =>
    <SC.FieldWrapper>
        <SC.Label>{ucFirst(label)}</SC.Label>
        <SC.Input
            type={type}
            {...register(label, { ...validation })}
        />
        {children}
    </SC.FieldWrapper>
