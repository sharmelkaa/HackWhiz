import {useSelector} from "react-redux";
import {UsersList} from "../../../UI/List";

export const MyFriends = () => {
    const { currentUser } = useSelector((state) => state.user)
    const friends = currentUser.friends.map((friend) => friend.username)

    return(
        <UsersList usernames={friends} />
    )
}