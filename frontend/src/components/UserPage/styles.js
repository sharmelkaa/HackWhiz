import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 25px auto 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 15px;
  border: 1px solid aliceblue;
  background: #000e19;
  border-radius: 50px;

  //-webkit-box-shadow: 15px 15px 25px 0 rgba(255, 255, 255, 0.5);
  //-moz-box-shadow: 15px 15px 25px 0 rgba(255, 255, 255, 0.5);
  //box-shadow: 15px 15px 25px 0 rgba(255, 255, 255, 0.9);
`

export const ImgMainInfoWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
`

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
export const ProfilePicture = styled.img`
  max-width: 300px;
  max-height: 300px;
  width: auto;
`

export const FriendsPostsWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-between;
`

export const LastPostWrapper = styled.div`
  display: flex;
`

export const FriendsWrapper = styled.div`
  display: flex;
`

export const PostsWrapper = styled.div`
  display: flex;
`