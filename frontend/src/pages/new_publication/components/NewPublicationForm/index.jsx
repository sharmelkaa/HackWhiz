import * as SC from '../../styles'
import {Form} from "../../../../components/UI/Form";
import {FormHeader} from "../../../../components/UI/Form/components/FormHeader";
import {FormFieldWrapper} from "../../../../components/UI/Form/components/FormFieldWrapper";
import {FormField} from "../../../../components/UI/Form/components/FormField";
import {Error} from "../../../../components/UI/Error";
import {Button} from "../../../../components/UI/Button";
import {FormWrapper} from "../../../../components/UI/Form/components/FormWrapper";
import {useForm} from "react-hook-form";
import {fetchData} from "../../../../api/fetchData";
import {updateUser} from "../../../../slices/userSlice";
import {useDispatch} from "react-redux";

const TITLE = 'title'
const BODY = 'body'
export const NewPublicationForm = ({ onOpenModal}) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onChange" })
    const dispatch = useDispatch()
    const onSubmit = async(data) => {
        const response = await fetchData('/post', 'POST', data)
        if (response.hasOwnProperty('message')) {
            onOpenModal(response.message)
            return
        }
        onOpenModal('Post published!')
        reset()
        dispatch(updateUser(response))
    }

    return(
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

                <SC.CheckboxWrapper>
                    <SC.Checkbox
                        type='checkbox'
                        id='private'
                        {...register('friendsOnly')}
                    />
                    <SC.CheckboxLabel
                        htmlFor='private'
                    >
                        Friends Only
                    </SC.CheckboxLabel>
                </SC.CheckboxWrapper>

                <Button>Post</Button>
            </Form>
        </FormWrapper>
    )
}