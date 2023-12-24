import {Form} from "../../../../components/UI/Form";
import {FormHeader} from "../../../../components/UI/Form/components/FormHeader";
import {FormFieldWrapper} from "../../../../components/UI/Form/components/FormFieldWrapper";
import {FormField} from "../../../../components/UI/Form/components/FormField";
import {passwordValidation, usernameValidation} from "../../../signup/validation/validationRules";
import {Error} from "../../../../components/UI/Error";
import {Button} from "../../../../components/UI/Button";
import {FormWrapper} from "../../../../components/UI/Form/components/FormWrapper";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {loginUser} from "../../../../slices/userSlice";
import {useState} from "react";
import {PasswordVisibility} from "../../../../components/UI/Form/components/PasswordVisibility";

const USERNAME = 'username'
const PASSWORD = 'password'
export const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" })
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const onSubmit = (userCredentials) => {
        dispatch(loginUser(userCredentials))
    }
    const onTogglePassword = () => {
        setShowPassword(prevState => !prevState)
    }

    return(
        <FormWrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader>Log In</FormHeader>

                <FormFieldWrapper>
                    <FormField
                        label={USERNAME}
                        register={register}
                        validation={{required: usernameValidation.required}}
                    />
                    {errors[USERNAME] && <Error>{errors[USERNAME].message}</Error>}
                </FormFieldWrapper>

                <FormFieldWrapper>
                    <FormField
                        label={PASSWORD}
                        type={showPassword ? 'text' : PASSWORD}
                        register={register}
                        validation={{required: passwordValidation.required}}
                        children={
                        <PasswordVisibility
                            showPassword={showPassword}
                            onClick={onTogglePassword}
                        />}
                    />
                    {errors[PASSWORD] && <Error>{errors[PASSWORD].message}</Error>}
                </FormFieldWrapper>

                <Button>Let me in!</Button>
            </Form>
        </FormWrapper>
    )
}