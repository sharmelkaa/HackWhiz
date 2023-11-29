import * as SC from './styles'
import {useEffect, useState} from "react";
import no_image from './8742495.png'
import {useParams} from "react-router";
import {useLocalStorage} from "../../hooks/useLocalStorage";

export const UserPage = () => {
    const { username } = useParams()
    const [error, setError] = useState('')
    const [data, setData] = useState('')
    const { getLocalStorage } = useLocalStorage()

    const [file, setFile] = useState()


    useEffect(() => {
        fetch(`http://localhost:3002/api/userdata?username=${username}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getLocalStorage('JWT')}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((error) => setError(error.message))
                    return
                }
                response.json().then((userData) => setData(userData))
            })
    }, [username]);

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('avatar', file)

        fetch(`http://localhost:3002/api/upload_avatar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getLocalStorage('JWT')}`
            },
            body: formData
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((error) => setError(error.message))
                    return
                }
                response.json().then((userData) => console.log(userData))
            })
    }

    const onDelete = () => {
        fetch(`http://localhost:3002/api/delete_avatar`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getLocalStorage('JWT')}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    response.json().then((error) => setError(error.message))
                    return
                }
                response.json().then((userData) => console.log(userData))
            })
    }

    return(
        <>
            <SC.Container>
                {(!data && !error) && <div>Loading...</div> }
                {data &&
                    <>
                        <SC.ImgMainInfoWrapper>
                            <SC.ProfilePicture src={data.avatar ? `http://localhost:3002/${data.avatar}`: no_image} />
                            <form encType="multipart/form-data" onSubmit={onSubmit}>
                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={e => setFile(e.target.files[0])}
                                    accept="image/*"
                                />
                                <button>SEND</button>
                            </form>
                            <button onClick={onDelete}>DELETE</button>
                            <SC.MainInfo>
                                {
                                    Object.keys(data).map((key, index) => <div key={index}>{key}: {data[key]}</div>)
                                }
                            </SC.MainInfo>
                        </SC.ImgMainInfoWrapper>

                        <SC.FriendsPostsWrapper>
                            <SC.FriendsWrapper>Friends</SC.FriendsWrapper>
                            <SC.PostsWrapper>Posts</SC.PostsWrapper>
                        </SC.FriendsPostsWrapper>
                    </>
                }
                {error && <div>{error}</div>}
            </SC.Container>

            <SC.Container>
                <SC.LastPostWrapper>
                    <div>Last Post</div>
                </SC.LastPostWrapper>
            </SC.Container>
        </>
    )
}