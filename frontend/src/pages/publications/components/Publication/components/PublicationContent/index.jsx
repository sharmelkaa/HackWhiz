import * as SC from '../../styles'
import {ManagePublication} from "../ManagePublication";
import delete_icon from "../../svg/delete.svg";
import {Comments} from "../Comments";
import {useSelector} from "react-redux";
import {useState} from "react";
export const PublicationContent = ({ post, access, onOpenWarningModal, openEditForm }) => {
    const { isAdmin } = useSelector((state) => state.user)
    const [showComments, setShowComments] = useState(false)
    const toggleComments = () => {
        setShowComments(prevState => !prevState)
    }

    return(
        <>
            <SC.FirstRow>
                <SC.Title>{post.title}&nbsp;{post.friendsOnly && <SC.Span>(friends only)</SC.Span>}</SC.Title>
                {access &&
                    <ManagePublication
                        openEditMode={openEditForm}
                        onOpenWarningModal={onOpenWarningModal}
                    />
                }
                {isAdmin &&
                    <SC.SVG
                        src={delete_icon}
                        onClick={onOpenWarningModal}
                    />
                }
            </SC.FirstRow>
            <SC.Body>{post.body}</SC.Body>
            <SC.ManageComments onClick={toggleComments}>
                {showComments ? 'Hide Comments' : 'Show Comments'}
            </SC.ManageComments>
            {showComments && <Comments post={post._id}/>}
        </>
    )
}