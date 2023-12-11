import * as SC from './styles'
export const Publication = ({ post }) => {

    return(
        <SC.Wrapper>
            <SC.Title>{post.title}</SC.Title>
            <SC.Body>{post.body}</SC.Body>
            <div>Show Comments</div>
        </SC.Wrapper>
    )
}