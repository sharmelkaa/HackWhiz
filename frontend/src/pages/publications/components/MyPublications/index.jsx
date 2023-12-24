import {useSelector} from "react-redux";
import {Publication} from "../Publication";
import * as SC from '../../styles'
import {dateDescSort} from "../../../../helpers/dateDescSort";
import {NoStuff} from "../../../../styles/styles";

export const MyPublications = () => {
    const { currentUser: { posts } } = useSelector((state) => state.user)
    const sortedPublications = dateDescSort(posts)
    const havePublications = posts.length !== 0

    return(
        <SC.Container>
            <SC.PublicationsHeader>My Publications</SC.PublicationsHeader>
            <SC.Link to={'/new_publication'}>Create New Publication --></SC.Link>
                {!havePublications && <NoStuff>You don't have any publications yet...</NoStuff>}
                {havePublications &&
                    <SC.Publications>
                        {sortedPublications.map((post) =>
                            <Publication
                                post={post}
                                key={post._id}
                                access={true}
                            />
                        )}
                    </SC.Publications>
                }
        </SC.Container>
    )
}