import {useSelector} from "react-redux";
import {UsersList} from "../../../../components/UI/UsersList";
import * as SC from '../../styles'
import {NoStuff} from "../../../../styles/styles";
export const MyFriends = () => {
    const { currentUser: { friends } } = useSelector((state) => state.user)
    const friendsNames = friends.map((friend) => friend.username)
    const haveFriends = friends.length !== 0

    return(
        <SC.Container>
            <SC.FriendsHeader>My Friends</SC.FriendsHeader>
            {!haveFriends && <NoStuff>You don't have any friends yet...</NoStuff>}
            {haveFriends && <UsersList usernames={friendsNames} />}
        </SC.Container>
    )
}