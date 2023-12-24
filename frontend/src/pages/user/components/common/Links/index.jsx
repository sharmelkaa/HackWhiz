import * as SC from '../../../styles'
export const Links = ({ username, postForm }) =>
    <SC.LinksWrapper>
        <SC.FriendsLink to={`/${username}/friends`}>Friends</SC.FriendsLink>
        <SC.PostsLink to={`/${username}/publications`}>Publications</SC.PostsLink>
        {postForm && <SC.NewPostLink to={`/new_publication`}>Create New Publication</SC.NewPostLink>}
    </SC.LinksWrapper>