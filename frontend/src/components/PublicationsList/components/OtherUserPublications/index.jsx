import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getData} from "../../../../api/getData";
import {Modal} from "../../../UI/Modal";
import {List} from "../../../UI/List";
import * as SC from "../../styles";
import {Publication} from "../Publication";
import {ucFirst} from "../../../UI/FormField/helpers/ucFirst";

export const OtherUserPublications = () => {
    const [modalMessage, setModalMessage] = useState('')
    const [publications, setPublications] = useState(null)
    const { username } = useParams()
    const onCloseModal = () => {
        setModalMessage('')
    }

    useEffect(() => {
        const getPublications = async() => {
            const response = await getData(`/get_posts?username=${username}`)

            if (response.hasOwnProperty('message')) {
                setModalMessage(response.message)
                return
            }
            setPublications(response.posts)
        }
        getPublications()
    }, [username]);

    return(
        <>
            {modalMessage && <Modal text={modalMessage} onClose={onCloseModal} />}
            {publications &&
                <SC.Container>
                    <SC.Author>{`${ucFirst(username)}\`s`} Publications</SC.Author>
                    <SC.Publications>
                        {publications.length && publications.map((publication) => <Publication post={publication} key={publication._id}/>)}
                    </SC.Publications>
                </SC.Container>
            }
        </>
    )
}