import {Form} from "../../../../components/UI/Form";
import {FormHeader} from "../../../../components/UI/Form/components/FormHeader";
import {FormFieldWrapper} from "../../../../components/UI/Form/components/FormFieldWrapper";
import {FormField} from "../../../../components/UI/Form/components/FormField";
import {emailValidation, passwordValidation, usernameValidation} from "../../helpers/validationRules";
import {Error} from "../../../../components/UI/Error";
import {PasswordVisibility} from "../../../../components/UI/Form/components/PasswordVisibility";
import {Button} from "../../../../components/UI/Button";
import {FormWrapper} from "../../../../components/UI/Form/components/FormWrapper";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {fetchData} from "../../../../api/fetchData";
import {useNavigate} from "react-router";

const USERNAME = 'username'
const EMAIL = 'email'
const PASSWORD = 'password'
export const SignupForm = ({ onOpenModal }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onChange" })
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const onTogglePassword = () => {
        setShowPassword(prevState => !prevState)
    }
    const onSubmit = async(userCredentials) => {
        const response = await fetchData('signup', 'POST', userCredentials)
        if (response.hasOwnProperty('message')) {
            onOpenModal(response.message)
            return
        }

        onOpenModal('You have successfully signed up!')

        setTimeout(() => {
            navigate(`/login`)
        }, 1000)
    }

    return(
        <FormWrapper>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormHeader>Sign Up</FormHeader>

                <FormFieldWrapper>
                    <FormField label={USERNAME} register={register} validation={usernameValidation}/>
                    {errors[USERNAME] && <Error>{errors[USERNAME].message}</Error>}
                </FormFieldWrapper>

                <FormFieldWrapper>
                    <FormField label={EMAIL} register={register} validation={emailValidation}/>
                    {errors[EMAIL] && <Error>{errors[EMAIL].message}</Error>}
                </FormFieldWrapper>

                <FormFieldWrapper>
                    <FormField
                        label={PASSWORD}
                        type={showPassword ? 'text' : PASSWORD}
                        register={register}
                        validation={passwordValidation}
                        children={
                            <PasswordVisibility
                                showPassword={showPassword}
                                onClick={onTogglePassword}
                            />}
                    />
                    {errors[PASSWORD] && <Error>{errors[PASSWORD].message}</Error>}
                </FormFieldWrapper>

                <Button>Join the team!</Button>
            </Form>
        </FormWrapper>
    )
}