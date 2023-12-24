import * as SC from '../../styles'
import {useSelector} from "react-redux";
import {AvatarWithEditRights} from "./components/AvatarWithEditRights";
import {PotentialFriends} from "./components/PotentialFriends";
import {MainInfo} from "../common/MainInfo";
import {Links} from "../common/Links";

export const MyPage = () =>  {
    const { currentUser } = useSelector((state) => state.user)

    return(
        <>
            <SC.Container>
                <AvatarWithEditRights />
                <MainInfo
                    user={currentUser}
                />
                <Links
                    username={currentUser.username}
                    postForm={true}
                />
             </SC.Container>

            <SC.Container>
                <PotentialFriends
                    user={currentUser.username}
                />
             </SC.Container>
         </>)
}