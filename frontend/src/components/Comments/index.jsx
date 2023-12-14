import * as SC from './styles'
import {useForm} from "react-hook-form";
import send from './svg/send.svg'
import {postData} from "../../api/postData";
import {useEffect, useState} from "react";
import {Modal} from "../UI/Modal";
import {getData} from "../../api/getData";
import no_image from "../UserPage/images/no_image.png";
import {Avatar} from "../UI/Avatar";

const COMMENT = 'comment'
const API_URL = 'http://localhost:3002/'
export const Comments = ({ author, post, hideComments, show }) => {
    const { register, handleSubmit, formState: { errors }} = useForm({ mode: "onChange" })
    const [modalMessage, setModalMessage] = useState(null)
    const [comments, setComments] = useState(null)
    console.log('rerender')

    useEffect(() => {
        const getComments = async() => {
            const response = await getData(`/get_comments?postID=${post}`)
            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            setComments(response.comments)
        }
        getComments()
    }, []);
    const onCloseModal = () => {
        setModalMessage(null)
    }
    const onSubmit = async(data) => {
        data.post = post
        data.author = author

        console.log('im here')
        const response = await postData('comment', data)
        if (response.hasOwnProperty('message')) {
            setModalMessage(response.message)
            return
        }


    }

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} /> }
            {comments &&
                <SC.Main show={show}>
                    <SC.Header>Comments <SC.Hide onClick={hideComments}>Hide comments</SC.Hide></SC.Header>
                    {comments.map((comment) =>
                            <SC.Comment key={comment._id}>
                                <SC.Content>
                                    <Avatar
                                        avatar={comment.author.avatar ? API_URL+comment.author.avatar : no_image}
                                        size='small'
                                    />
                                    <SC.Text>
                                        <SC.Author>{comment.author.username}</SC.Author>
                                        <div>{comment.comment}</div>
                                    </SC.Text>
                                </SC.Content>
                            </SC.Comment>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <SC.SendRow>
                        <SC.CommentInput
                            type='text'
                            placeholder='Сomment...'
                            {...register(COMMENT, { required: 'Comment can\'t be empty' })}
                        />
                        <SC.Button><SC.Send src={send} /></SC.Button>
                    </SC.SendRow>
                    {errors[COMMENT] && <SC.CommentError>{errors[COMMENT].message}</SC.CommentError>}
                </form>
                </SC.Main>
            }
        </>
    )
}