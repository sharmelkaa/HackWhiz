import {useDispatch, useSelector} from "react-redux";
import {Publication} from "../Publication";
import * as SC from '../../styles'
import {dateDescSort} from "../../../../helpers/dateDescSort";

export const MyPublications = () => {
    const { currentUser: { posts } } = useSelector((state) => state.user)
    const sortedPublications = dateDescSort(posts)
    const havePublications = posts.length !== 0

    return(
        <SC.Container>
            {!havePublications &&
                <>
                    <SC.Author>You don't have any publications yet...</SC.Author>
                    <SC.Link to={'/new_publication'}>Create New Publication --></SC.Link>
                </>
            }
            {havePublications &&
                <>
                    <SC.Author>My Publications</SC.Author>
                    <SC.Link to={'/new_publication'}>Create New Publication --></SC.Link>
                    <SC.Publications>
                        {sortedPublications.map((post) =>
                            <Publication
                                post={post}
                                key={post._id}
                                access={true}
                            />
                        )}
                    </SC.Publications>
                </>
            }
        </SC.Container>
    )
}