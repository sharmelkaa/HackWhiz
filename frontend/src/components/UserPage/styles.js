import styled from 'styled-components'
import {NavLink} from "react-router-dom";
export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 25px auto 0;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 25px;
  border: 1px solid aliceblue;
  background: #000e19;
  border-radius: 50px;
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
export const FriendsLink= styled(NavLink)`
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
    text-shadow: 0 0 7px #fff, 0 0 3px #fff, 0 0 21px #fff;
  }
`
export const PostsLink = styled(FriendsLink)``
export const NewPostLink = styled(FriendsLink)``

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const ResentPostHeader = styled.div`
  display: flex;
  justify-content: center;
  font-size: 42px;
  color: yellow;
  text-shadow: 4px 4px 9px yellow;
`
export const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`
export const Title = styled.div`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 24px;
`
export const Body = styled.div`
  display: flex;
  font-style: oblique;
`
export const Span = styled.span`
  font-style: italic;
  font-size: 0.7em;
  color: orangered;
`
export const RecentPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const ManageComments = styled.div`
  align-self: flex-end;
  font-size: 24px;
  font-style: italic;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    text-shadow:0 0 5px aliceblue, 0 0 5px aliceblue, 0 0 5px aliceblue;
  }
`