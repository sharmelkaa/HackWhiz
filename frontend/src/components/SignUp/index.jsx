import * as SC from "../SignUp/styles";
import {Form} from "../UI/Form";
import {Button} from "../UI/Button";
import { useForm } from "react-hook-form"
import {FormField} from "../UI/FormField";
import {emailValidation, passwordValidation, usernameValidation} from "./helpers/validationRules";
import {fetchData} from "../../api/fetchData";
import {useState} from "react";
import {Modal} from "../UI/Modal";
import {useNavigate} from "react-router";
import closed_eye from './images/eye-closed-svgrepo-com.svg'
import opened_eye from './images/eye-svgrepo-com.svg'
import {useSelector} from "react-redux";
import {useLocalStorage} from "../../hooks/useLocalStorage";

const USERNAME = 'username'
const EMAIL = 'email'
const PASSWORD = 'password'

export const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onChange" })
    const [modalMessage, setModalMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const { isLogged } = useSelector((state) => state.user)
    const { getLocalStorage } = useLocalStorage()
    const username = getLocalStorage('username')

    if (isLogged) {
        return(
            <SC.LoggedInWrapper>
                <SC.Warning>You have to log out before signing up...</SC.Warning>
                <SC.PageLink to={`/${username}`}>Go to my page --></SC.PageLink>
            </SC.LoggedInWrapper>
        )
    }

    const onCloseModal = () => {
        setModalMessage('')
    }

    const onSubmit = async (userCredentials) => {

        const response = await fetchData('signup', 'POST', userCredentials)
        const data = await response.json()

        if (!response.ok) {
            setModalMessage(data.message)
            return
        }

        setModalMessage(data.message)

        setTimeout(() => {
            navigate(`/login`)
        }, 1000)
        reset()
    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            <SC.SignUpWrapper>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <SC.Header>Sign Up</SC.Header>

                    <SC.FieldWrapper>
                        <FormField label={USERNAME} register={register} validation={usernameValidation}/>
                        {errors[USERNAME] && <SC.Error>{errors[USERNAME].message}</SC.Error>}
                    </SC.FieldWrapper>

                    <SC.FieldWrapper>
                        <FormField label={EMAIL} register={register} validation={emailValidation}/>
                        {errors[EMAIL] && <SC.Error>{errors[EMAIL].message}</SC.Error>}
                    </SC.FieldWrapper>

                    <SC.FieldWrapper>
                        <FormField
                            label={PASSWORD}
                            type={showPassword ? 'text' : PASSWORD}
                            register={register}
                            validation={passwordValidation}
                            children={<SC.Img src={showPassword ? closed_eye : opened_eye} onClick={() => setShowPassword(prevState => !prevState)}/>}
                        />
                        {errors[PASSWORD] && <SC.Error>{errors[PASSWORD].message}</SC.Error>}
                    </SC.FieldWrapper>

                    <Button>Join the team!</Button>
                </Form>
            </SC.SignUpWrapper>
        </>
    )
}