import * as SC from './styles'
import {Form} from "../UI/Form";
import {Field} from "../UI/Field";
import {Button} from "../UI/Button";
import {useState} from "react";
import {useNavigate} from "react-router";
import {Modal} from "../UI/Modal";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../slices/userSlice";

const DEFAULT_VALUES = {username:'', password:''}
export const LogIn = () => {
    const [formValues, setFormValues] = useState(DEFAULT_VALUES)
    const [modalMessage, setModalMessage] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user  = useSelector((state) => state.user.user)
    const error = useSelector((state) => state.user.error)

    const disabledButton = !formValues.username || !formValues.password

    const onCloseModal = () => {
        setModalMessage(null)
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        dispatch(loginUser(formValues))

        if (user) {
            setModalMessage(`Welcome, ${user.user.username}!`)
            setTimeout(() => {
                navigate(`/${user.user.username}`)
            }, 1500)
        }
    }

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            <SC.LogInWrapper>
                <Form>
                    <SC.Header>Log In</SC.Header>
                    <Field
                        label='Username'
                        type='text'
                        placeholder='put your username here...'
                        name='username'
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />

                    <Field
                        label='Password'
                        type='password'
                        placeholder='put your password here...'
                        name='password'
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />
                    <Button
                        type='submit'
                        text="Let me in!"
                        onClick={onSubmit}
                        disabled={disabledButton}
                    />
                </Form>
            </SC.LogInWrapper>
        </>
    )
}