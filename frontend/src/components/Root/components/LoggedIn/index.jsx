import * as SC from '../../styles'
import {Button} from "../../../UI/Button";
import {logoutUser} from "../../../../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
export const LoggedIn = () => {
    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const { currentUser, isAdmin } = useSelector((state) => state.user)
    const onLogOut = async () => {
        dispatch(logoutUser())
    }

    return(
        <SC.Header>
            <SC.Greeting onClick={() => navigate(`/${currentUser.username}`)}>
                {`Welcome, ${isAdmin ? 'Creator' : currentUser.username}!`}
            </SC.Greeting>

            <SC.LinksContainer>
                <Button onClick={onLogOut}>Log Out</Button>
            </SC.LinksContainer>
        </SC.Header>
    )
}
