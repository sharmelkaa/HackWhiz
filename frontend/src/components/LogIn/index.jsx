import * as SC from './styles'
import {Form} from "../UI/Form";
import {Field} from "../UI/Field";
import {Button} from "../UI/Button";
import {useState} from "react";
import {useNavigate} from "react-router";
import {useRequest} from "../../hooks/useRequest";
import {Modal} from "../UI/Modal";

const DEFAULT_VALUES = {username:'', password:''}
export const LogIn = () => {
    const [formValues, setFormValues] = useState(DEFAULT_VALUES)
    const [modalMessage, setModalMessage] = useState(null)

    const onCloseModal = () => {
        setModalMessage(null)
    }

    const navigate = useNavigate()
    const loginRequest = useRequest()


    const disabledButton = !formValues.username || !formValues.password

    const onSubmit = async (e) => {
        e.preventDefault()

        const { status, message } = await loginRequest('login', 'POST', formValues)

        if (status !== 200) {
            setModalMessage(message)
            return
        }

        setModalMessage(`Welcome, ${formValues.username}!`)
        setTimeout(() => {
            navigate(`/${formValues.username}`)
        }, 2000)

        console.log('success')
    }

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    return(<>
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