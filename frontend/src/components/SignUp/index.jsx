import * as SC from "../SignUp/styles";
import {Form} from "../UI/Form";
import {Button} from "../UI/Button";
import { useForm } from "react-hook-form"
import {FormField} from "../UI/FormField";
import {emailValidation, passwordValidation, usernameValidation} from "./helpers/validationRules";
import {useState} from "react";
import {Modal} from "../UI/Modal";
import {useNavigate} from "react-router";
import closed_eye from './images/eye-closed-svgrepo-com.svg'
import opened_eye from './images/eye-svgrepo-com.svg'
import {useSelector} from "react-redux";
import {postData} from "../../api/postData";
import {FormFieldWrapper} from "../UI/FormFieldWrapper";
import {Error} from "../UI/Error";
import {FormWrapper} from "../UI/FormWrapper";
import {FormHeader} from "../UI/FormHeader";

const USERNAME = 'username'
const EMAIL = 'email'
const PASSWORD = 'password'

export const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onChange" })
    const [modalMessage, setModalMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { isLogged, currentUser } = useSelector((state) => state.user)

    if (isLogged) {
        return(
            <SC.LoggedInWrapper>
                <SC.Warning>You have to log out before signing up...</SC.Warning>
                <SC.PageLink to={`/${currentUser.username}`}>Go to my page --></SC.PageLink>
            </SC.LoggedInWrapper>
        )
    }

    const onCloseModal = () => {
        setModalMessage('')
    }

    const onSubmit = async (userCredentials) => {
        const response = await postData('signup', userCredentials)

        setModalMessage(response.message)

        if (response.message !== 'User successfully signed up') {
            return
        }

        setTimeout(() => {
            navigate(`/login`)
        }, 1000)
    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
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
                            children={<SC.Img src={showPassword ? closed_eye : opened_eye} onClick={() => setShowPassword(prevState => !prevState)}/>}
                        />
                        {errors[PASSWORD] && <Error>{errors[PASSWORD].message}</Error>}
                    </FormFieldWrapper>

                    <Button>Join the team!</Button>
                </Form>
            </FormWrapper>
        </>
    )
}