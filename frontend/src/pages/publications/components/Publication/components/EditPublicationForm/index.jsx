import * as SC from '../../styles'
import { Form } from '../../../../../../components/UI/Form'
import { FormField } from '../../../../../../components/UI/Form/components/FormField'
import close_icon from '../../svg/close.svg'
import { Error } from '../../../../../../components/UI/Error'
import { Button } from '../../../../../../components/UI/Button'
import { useForm } from 'react-hook-form'
import { isObjectEmpty } from '../../../../../../helpers/isObjectEmpty'
import { fetchData } from '../../../../../../api/fetchData'
import { updateUser } from '../../../../../../slices/userSlice'
import { useDispatch } from 'react-redux'
import {
    bodyValidation,
    titleValidation,
} from '../../../../../new_publication/components/NewPublicationForm/newPublicationValidation'

const TITLE = 'title'
const BODY = 'body'
export const EditPublicationForm = ({ post, onOpenModal, closeEditForm }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            title: post.title,
            body: post.body,
            friendsOnly: post.friendsOnly,
        },
    })
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        if (isObjectEmpty(dirtyFields)) {
            onOpenModal('You have to change at least one field!')
            return
        }
        const body = {}
        const changes = {}
        Object.keys(dirtyFields).forEach((key) => (changes[key] = data[key]))
        body.postID = post._id
        body.changes = changes

        const response = await fetchData('edit_post', 'PATCH', body)
        if (response.hasOwnProperty('message')) {
            onOpenModal(response.message)
            return
        }
        dispatch(updateUser(response))
        closeEditForm()
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField
                type="text"
                register={register}
                label={TITLE}
                validation={titleValidation}
                children={<SC.Close src={close_icon} onClick={closeEditForm} />}
            />
            {errors[TITLE] && <Error>{errors[TITLE].message}</Error>}

            <SC.EditWrapper>
                <SC.Label>Body</SC.Label>
                <SC.Text rows={5} {...register(BODY, bodyValidation)} />
            </SC.EditWrapper>
            {errors[BODY] && <Error>{errors[BODY].message}</Error>}

            <SC.CheckboxWrapper>
                <SC.Checkbox
                    type="checkbox"
                    id="private"
                    {...register('friendsOnly')}
                />
                <SC.CheckboxLabel htmlFor="private">
                    Friends Only
                </SC.CheckboxLabel>
            </SC.CheckboxWrapper>

            <Button>Save changes</Button>
        </Form>
    )
}
