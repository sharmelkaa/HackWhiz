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

const USERNAME = 'username'
const EMAIL = 'email'
const PASSWORD = 'password'

export const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onChange" })
    const [modalMessage, setModalMessage] = useState('')
    const navigate = useNavigate()

    const onCloseModal = () => {
        setModalMessage('')
    }

    const onSubmit = async (userCredentials) => {
        console.log(userCredentials)

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
                        <FormField label={PASSWORD} type={PASSWORD} register={register} validation={passwordValidation}/>
                        {errors[PASSWORD] && <SC.Error>{errors[PASSWORD].message}</SC.Error>}
                    </SC.FieldWrapper>

                    <Button>Join the team!</Button>
                </Form>
            </SC.SignUpWrapper>
        </>
    )
}