import {useParams} from "react-router";
import {useSelector} from "react-redux";
import {MyPage} from "./components/MyPage";
import {OtherUserPage} from "./components/OtherUserPage";

export const UserPage = () => {
    const { username } = useParams()
    const { currentUser, error } = useSelector((state) => state.user)
    const myPage = currentUser.username === username

    if (error) {
        return(<div>{error}</div>)
    }

    if (myPage) {
        return(<MyPage />)
    }

    return(<OtherUserPage />)
}