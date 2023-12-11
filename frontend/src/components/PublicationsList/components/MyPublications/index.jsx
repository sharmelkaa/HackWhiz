import {useSelector} from "react-redux";
import {Publication} from "../Publication";
import * as SC from '../../styles'

export const MyPublications = () => {
    const { currentUser: { posts } } = useSelector((state) => state.user)
    return(
        <SC.Container>
            <SC.Author>My Publications</SC.Author>
            <SC.Publications>
                {posts.map((post) => <Publication post={post} key={post._id}/>)}
            </SC.Publications>
        </SC.Container>
    )
}