import * as SC from './styles'
import {Form} from "../UI/Form";
import {Field} from "../UI/Field";
import {Button} from "../UI/Button";
import {useState} from "react";
import {useNavigate} from "react-router";
import {Modal} from "../UI/Modal";
import {fetchData} from "../../api/fetchData";

const DEFAULT_VALUES = {username:'', password:''}
export const LogIn = () => {
    const [formValues, setFormValues] = useState(DEFAULT_VALUES)
    const [modalMessage, setModalMessage] = useState('')
    const navigate = useNavigate()

    const disabledButton = !formValues.username || !formValues.password

    const onCloseModal = () => {
        setModalMessage('')
    }

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        const response = await fetchData('login', 'POST', formValues)
        const data = await response.json()

        if (!response.ok) {
            setModalMessage(data.message)
            data.message === 'Wrong password' ? setFormValues({...formValues, password: ''}) : setFormValues(DEFAULT_VALUES)
            return
        }

        localStorage.setItem('JWT', JSON.stringify(data))

        setModalMessage(`Welcome, ${formValues.username}!`)

        setTimeout(() => {
            navigate(`/${formValues.username}`, { replace: true })
            },1500)
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
                        value={formValues.username}
                        onChange={(e) => onChange(e.target.name, e.target.value)}
                    />

                    <Field
                        label='Password'
                        type='password'
                        placeholder='put your password here...'
                        name='password'
                        value={formValues.password}
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