import {useDispatch, useSelector} from "react-redux";
import {Publication} from "../Publication";
import * as SC from '../../styles'

export const MyPublications = () => {
    const { currentUser: { posts } } = useSelector((state) => state.user)
    const postsCopy = [...posts]
    postsCopy.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    const dispatch = useDispatch()

    if (posts.length === 0) {
        return(
            <SC.Container>
                <SC.Author>You don't have any publications yet...</SC.Author>
                <SC.Link to={'/new_publication'}>Create New Publication --></SC.Link>
            </SC.Container>
        )
    }

    return(
        <SC.Container>
            <SC.Author>My Publications</SC.Author>
            <SC.Publications>
                {postsCopy.map((post) =>
                    <Publication
                        post={post}
                        key={post._id}
                        access={true}
                    />
                )}
            </SC.Publications>
        </SC.Container>
    )
}