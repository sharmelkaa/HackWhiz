import * as SC from './styles'
import {Form} from "../UI/Form";
import {useForm} from "react-hook-form";
import {FormField} from "../UI/FormField";
import {Error} from "../UI/Error";
import {FormFieldWrapper} from "../UI/FormFieldWrapper";
import {FormWrapper} from "../UI/FormWrapper";
import {FormHeader} from "../UI/FormHeader";
import {Button} from "../UI/Button";
import {postData} from "../../api/postData";
import {useState} from "react";
import {Modal} from "../UI/Modal";
import {useDispatch} from "react-redux";
import {setUser} from "../../slices/userSlice";

const TITLE = 'title'
const BODY = 'body'
export const NewPublication = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onChange" })
    const [modalMessage, setModalMessage] = useState('')
    const dispatch = useDispatch()
    const onCloseModal = () => {
        setModalMessage('')
    }
    const onSubmit = async(data) => {
        const response = await postData('/post', data)
        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }
        setModalMessage('Post published!')
        reset()
        dispatch(setUser(response.user))
    }
    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            <FormWrapper>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <FormHeader>Create New Publication</FormHeader>

                    <FormFieldWrapper>
                        <FormField
                            label={TITLE}
                            type='text'
                            register={register}
                            validation={{required: 'Title is required'}}
                        />
                        {errors[TITLE] && <Error>{errors[TITLE].message}</Error>}
                    </FormFieldWrapper>

                    <FormFieldWrapper>
                        <SC.TextareaWrapper>
                            <SC.TextareaLabel>Body</SC.TextareaLabel>
                            <SC.Textarea rows={5} {...register(BODY, { required: 'Body is required' })} />
                        </SC.TextareaWrapper>
                        {errors[BODY] && <Error>{errors[BODY].message}</Error>}
                    </FormFieldWrapper>

                    <Button>Post</Button>
                </Form>
            </FormWrapper>
        </>
    )
}