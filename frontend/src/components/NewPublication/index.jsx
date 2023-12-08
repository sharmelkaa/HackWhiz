import * as SC from './styles'
import {Form} from "../UI/Form";
import {useForm} from "react-hook-form";
import {FormField} from "../UI/FormField";
import {Error} from "../UI/Error";
import {FormFieldWrapper} from "../UI/FormFieldWrapper";
import {FormWrapper} from "../UI/FormWrapper";
import {FormHeader} from "../UI/FormHeader";
import {Button} from "../UI/Button";


const TITLE = 'title'
const BODY = 'body'
export const NewPublication = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "onChange" })

    const onSubmit = (data) => {
        console.log(data)
    }
    return(
        <SC.Container>
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
                            <SC.Textarea rows={10} cols={20} {...register(BODY, { required: 'Body is required' })} />
                        </SC.TextareaWrapper>
                        {errors[BODY] && <Error>{errors[BODY].message}</Error>}
                    </FormFieldWrapper>

                    <Button>Post</Button>
                </Form>
            </FormWrapper>
        </SC.Container>
    )
}