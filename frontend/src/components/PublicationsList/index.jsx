import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {OtherUserPublications} from "./components/OtherUserPublications";
import {MyPublications} from "./components/MyPublications";
export const PublicationsList = () => {
    const { currentUser } = useSelector((state) => state.user)
    const { username } = useParams()

    if (currentUser.username === username) {
        return <MyPublications />
    }

    return <OtherUserPublications />
}


