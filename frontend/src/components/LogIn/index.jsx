import * as SC from './styles'
import {Form} from "../UI/Form";
import {Button} from "../UI/Button";
import {useLayoutEffect, useState} from "react";
import {useNavigate} from "react-router";
import {Modal} from "../UI/Modal";
import {fetchData} from "../../api/fetchData";
import {logIn} from "../../slices/userSlice";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {FormField} from "../UI/FormField";
import {passwordValidation, usernameValidation} from "../SignUp/helpers/validationRules";
import closed_eye from "./images/eye-closed-svgrepo-com.svg";
import opened_eye from "./images/eye-svgrepo-com.svg";
import {useLocalStorage} from "../../hooks/useLocalStorage";

const USERNAME = 'username'
const PASSWORD = 'password'

export const LogIn = () => {
    const { register, handleSubmit, formState: { errors }, resetField, reset } = useForm({ mode: "onChange" })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [modalMessage, setModalMessage] = useState('')
    const [loggedUser, setLoggedUser] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { setLocalStorage, getLocalStorage } = useLocalStorage()

    useLayoutEffect(() => {
        const user = getLocalStorage('username')
        if (user) {
            setLoggedUser(user)
        }
    }, [])

    const onCloseModal = () => {
        setModalMessage('')
    }

    const onSubmit = async (userCredentials) => {
        const response = await fetchData('login', 'POST', userCredentials)
        const data = await response.json()

        if (!response.ok) {
            setModalMessage(data.message)
            data.message === 'Wrong password' ? resetField(PASSWORD) : reset()
            return
        }

        setLocalStorage('JWT', data.token)
        setLocalStorage('username', userCredentials.username)

        dispatch(logIn())

        navigate(`/${userCredentials.username}`, { replace: true })
    }

    return(
        <>
            {loggedUser &&
                <SC.LoggedInWrapper>
                    <SC.Warning>You are already logged in...</SC.Warning>
                    <SC.PageLink to={`/${loggedUser}`}>Go to my page --></SC.PageLink>
                </SC.LoggedInWrapper>}

            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}

            {!loggedUser && <SC.LogInWrapper>
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