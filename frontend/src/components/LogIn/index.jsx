import * as SC from './styles'
import {Form} from "../UI/Form";
import {Field} from "../UI/Field";
import {Button} from "../UI/Button";
import {useState} from "react";
import {useNavigate} from "react-router";


const DEFAULT_VALUES = {username:'', password:''}
export const LogIn = () => {
    const [formValues, setFormValues] = useState(DEFAULT_VALUES)
    const disabledButton = !formValues.username || !formValues.password
    const navigate = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(formValues)
        try {
            const response =  await fetch(`http://localhost:3002/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formValues
                })
            })
            if (response.status !== 200) {
                const json = await response.json()
                alert(json.message)
            }

            alert('YOU SIGNED IN!')
            navigate(`/${formValues.username}`)
        } catch (e) {
            console.log(e)
        }
    }

    const onChange = (name, value) => {
        setFormValues({...formValues, [name]: value})
    }

    return(
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
        </SC.LogInWrapper>)
}