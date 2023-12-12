import * as SC from './styles'
export const Publication = ({ post }) =>
    <SC.Wrapper>
        <SC.Title>{post.title}&nbsp;{post.friendsOnly && <SC.Span>(friends only)</SC.Span>}</SC.Title>
        <SC.Body>{post.body}</SC.Body>
        <div>Show Comments</div>
    </SC.Wrapper>
