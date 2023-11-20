import * as SC from "../Field/styles";
import {ucFirst} from "./helpers/ucFirst";

export const FormField = ({ label, type, register, validation }) =>
    <SC.FieldWrapper>
        <SC.Label>{ucFirst(label)}</SC.Label>
        <SC.Input
            type={type}
            {...register(label, { ...validation })}
        />
    </SC.FieldWrapper>
