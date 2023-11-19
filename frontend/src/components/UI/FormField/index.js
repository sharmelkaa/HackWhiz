import * as SC from "../Field/styles";
import {ucFirst} from "./helpers/ucFirst";

export const FormField = ({ label, register, validation }) =>
    <SC.FieldWrapper>
        <SC.Label>{ucFirst(label)}</SC.Label>
        <SC.Input
            {...register(label, { ...validation })}
        />
    </SC.FieldWrapper>
