import * as SC from './styles'

export const List = ({ usernames }) => {
    return(
        <SC.ListContainer>
            {
                usernames.map((username, index) => <SC.UserLink to={`/${username}`} key={index}>{username}</SC.UserLink>)
            }
        </SC.ListContainer>
    )
}