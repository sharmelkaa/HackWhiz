import * as SC from "../SignUp/styles";
import {Form} from "../UI/Form";
import {Button} from "../UI/Button";
import { useForm } from "react-hook-form"
import {FormField} from "../UI/FormField";
import {emailValidation, passwordValidation, usernameValidation} from "./helpers/validationRules";

const USERNAME = 'username'
const EMAIL = 'email'
const PASSWORD = 'password'

export const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ mode: "onChange" })

    const onSubmit = (data) => {
        console.log(data)
        reset()
    }

    return(
        <SC.SignUpWrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <SC.FieldWrapper>
                    <FormField label={USERNAME} register={register} validation={usernameValidation}/>
                    {errors[USERNAME] && <SC.Error>{errors[USERNAME].message}</SC.Error>}
                </SC.FieldWrapper>

                <SC.FieldWrapper>
                    <FormField label={EMAIL} register={register} validation={emailValidation}/>
                    {errors[EMAIL] && <SC.Error>{errors[EMAIL].message}</SC.Error>}
                </SC.FieldWrapper>

                <SC.FieldWrapper>
                    <FormField label={PASSWORD} register={register} validation={passwordValidation}/>
                    {errors[PASSWORD] && <SC.Error>{errors[PASSWORD].message}</SC.Error>}
                </SC.FieldWrapper>

                <Button text={'Join the team!'}></Button>
            </Form>
        </SC.SignUpWrapper>
    )
}