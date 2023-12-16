import {useSelector} from "react-redux";
import {UsersList} from "../../../UI/UsersList";
import * as SC from '../../styles'

export const MyFriends = () => {
    const { currentUser: { friends } } = useSelector((state) => state.user)
    const friendsNames = friends.map((friend) => friend.username)
    const haveFriends = friends.length !== 0

    return(
        <SC.Container>
            {!haveFriends &&
                <>
                    <SC.FriendsHeader>You don't have any friends yet...</SC.FriendsHeader>
                </>
            }
            {haveFriends &&
                <>
                    <SC.FriendsHeader>My Friends</SC.FriendsHeader>
                    <UsersList usernames={friendsNames} />
                </>}
        </SC.Container>
    )
}