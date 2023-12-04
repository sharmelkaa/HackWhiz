import * as SC from './styles'
import {Form} from "../UI/Form";
import {Button} from "../UI/Button";
import {useState} from "react";
import {Navigate} from "react-router";
import {Modal} from "../UI/Modal";
import {logIn} from "../../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {FormField} from "../UI/FormField";
import {passwordValidation, usernameValidation} from "../SignUp/helpers/validationRules";
import closed_eye from "./images/eye-closed-svgrepo-com.svg";
import opened_eye from "./images/eye-svgrepo-com.svg";
import {setLocalStorage} from "../../helpers/manageLocalStorage";
import {postData} from "../../api/postData";

const USERNAME = 'username'
const PASSWORD = 'password'

export const LogIn = () => {
    const { register, handleSubmit, formState: { errors }, resetField, reset } = useForm({ mode: "onChange" })
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const [modalMessage, setModalMessage] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const onCloseModal = () => {
        setModalMessage('')
    }

    const onSubmit = async (userCredentials) => {
        const response = await postData('login', userCredentials)

        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            response.message === 'Wrong password' ? resetField(PASSWORD) : reset()
            return
        }

        setLocalStorage('JWT', response.token)
        dispatch(logIn(response.user))
    }

    return(
        <>
            {currentUser && <Navigate to={`/${currentUser.username}`} />}

            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}

            {!currentUser && <SC.LogInWrapper>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <SC.Header>Log In</SC.Header>

                    <SC.FieldWrapper>
                        <FormField label={USERNAME} register={register} validation={{required: usernameValidation.required}} />
                        {errors[USERNAME] && <SC.Error>{errors[USERNAME].message}</SC.Error>}
                    </SC.FieldWrapper>

                    <SC.FieldWrapper>
                        <FormField
                            label={PASSWORD}
                            type={showPassword ? 'text' : PASSWORD}
                            register={register}
                            validation={{required: passwordValidation.required}}
                            children={<SC.Img src={showPassword ? closed_eye : opened_eye} onClick={() => setShowPassword(prevState => !prevState)} />}
                        />
                        {errors[PASSWORD] && <SC.Error>{errors[PASSWORD].message}</SC.Error>}
                    </SC.FieldWrapper>

                    <Button>Let me in!</Button>
                </Form>
            </SC.LogInWrapper>}
        </>
    )
}