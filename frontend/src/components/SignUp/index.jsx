import * as SC from "../LogIn/styles";
import {Form} from "../UI/Form";
import {Field} from "../UI/Field";
import {Button} from "../UI/Button";
import {useState} from "react";
import { useForm } from "react-hook-form"
import {TestInput} from "../UI/testInput";

const DEFAULT_VALUES = {username:'', email: '', password:''}

export const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({ mode: "onChange" })

    const onSubmit = (data) => {
        console.log(data)
        reset()
    }

    const validation = {
        required: 'Username is required field',
        minLength: {
            value: 4,
            message: 'Username must be at least 4 characters long'
        }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('username', {
                required: 'Username is required field',
                minLength: {
                    value: 4,
                    message: 'Username must be at least 4 characters long'
                }
            })} />
            {errors.username && <span>{errors.username.message}</span>}

            <TestInput label='USER' register={register} validation={validation}/>
            {errors.USER && <span>{errors.USER.message}</span>}


            <input {...register('email', {
                required: 'Email is required field',
                pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Enter a valid email'
                }
            })} />
            {errors.email && <span>{errors.email.message}</span>}

            <input {...register('password', {
                required: 'Password is required field',
                pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
                    message: 'Password must consist of 6-20 characters containing at least one digit, one upper and one lowercase letter'
                }
            })} />
            {errors.password && <span>{errors.password.message}</span>}

            <button>Join the team!</button>
        </form>
    )

    // const [formValues, setFormValues] = useState(DEFAULT_VALUES)
    //
    // const disabledButton = !formValues.username || !formValues.email || !formValues.password
    //
    // const onChange = (name, value) => {
    //     setFormValues({...formValues, [name]: value})
    // }
    //
    // const onSubmit = (e) => {
    //     e.preventDefault()
    //
    //     console.log('submit')
    // }
    //
    // return(
    //     <>
    //         {/*{modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}*/}
    //         <SC.LogInWrapper>
    //             <Form>
    //                 <SC.Header>Sign Up</SC.Header>
    //                 <Field
    //                     label='Username'
    //                     type='text'
    //                     placeholder='put your username here...'
    //                     name='username'
    //                     value={formValues.username}
    //                     onChange={(e) => onChange(e.target.name, e.target.value)}
    //                 />
    //
    //                 <Field
    //                     label='Email'
    //                     type='email'
    //                     placeholder='put your email here...'
    //                     name='email'
    //                     value={formValues.email}
    //                     onChange={(e) => onChange(e.target.name, e.target.value)}
    //                 />
    //
    //                 <Field
    //                     label='Password'
    //                     type='password'
    //                     placeholder='put your password here...'
    //                     name='password'
    //                     value={formValues.password}
    //                     onChange={(e) => onChange(e.target.name, e.target.value)}
    //                 />
    //                 <Button
    //                     type='submit'
    //                     text="JOin the team!"
    //                     onClick={onSubmit}
    //                     disabled={disabledButton}
    //                 />
    //             </Form>
    //         </SC.LogInWrapper>
    //     </>
    // )
}