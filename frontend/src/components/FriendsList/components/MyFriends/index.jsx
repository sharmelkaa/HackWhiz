import {useSelector} from "react-redux";
import {UsersList} from "../../../UI/UsersList";
import * as SC from '../../styles'

export const MyFriends = () => {
    const { currentUser: { friends } } = useSelector((state) => state.user)
    if (friends.length === 0) {
        return(
            <SC.Container>
                <SC.NoFriends>You don't have any friends yet...</SC.NoFriends>
                <div>FIND THEM</div>
            </SC.Container>
        )
    }

    const usernames = friends.map((friend) => friend.username)
    return(
        <SC.Container>
            <UsersList usernames={usernames} />
        </SC.Container>
    )
}