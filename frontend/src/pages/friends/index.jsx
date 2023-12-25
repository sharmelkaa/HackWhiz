import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { MyFriends } from './components/MyFriends'
import { OtherUserFriends } from './components/OtherUserFriends'

export const Friends = () => {
    const { currentUser } = useSelector((state) => state.user)
    const { username } = useParams()

    if (currentUser.username === username) {
        return <MyFriends />
    }

    return <OtherUserFriends />
}
