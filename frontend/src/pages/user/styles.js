import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Header, MainContainer } from '../../styles/styles'

export const Container = styled(MainContainer)`
    display: flex;
    justify-content: space-between;
    gap: 15px;
    padding: 25px;
    border: 1px solid aliceblue;
    background: #000e19;
    border-radius: 50px;
`
export const SecondContainer = styled(Container)`
    justify-content: center;
`
export const LinksWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: space-between;
`
export const MainInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`
export const FriendsLink = styled(NavLink)`
    cursor: pointer;
    font-size: 36px;
    text-decoration: none;
    border: 1px solid white;
    border-radius: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        text-shadow:
            0 0 7px #fff,
            0 0 3px #fff,
            0 0 21px #fff;
    }
`
export const PostsLink = styled(FriendsLink)``
export const NewPostLink = styled(FriendsLink)``
export const AvatarWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`
export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`
export const SecondHeader = styled(Header)`
    color: yellow;
    text-shadow: 4px 4px 9px yellow;
`
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`
