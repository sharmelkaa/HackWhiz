import * as SC from './styles'

export const UsersList = ({ usernames }) => {
    return(
        <SC.UsersListContainer>
            {
                usernames.map((username, index) => <SC.UserLink to={`/${username}`} key={index}>{username}</SC.UserLink>)
            }
        </SC.UsersListContainer>
    )
}