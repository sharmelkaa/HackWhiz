import {useSelector} from "react-redux";
import {List} from "../../../UI/List";

export const MyFriends = () => {
    const { currentUser } = useSelector((state) => state.user)
    const friends = currentUser.friends.map((friend) => friend.username)

    return(
        <List usernames={friends} />
    )
}