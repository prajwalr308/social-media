import React,{useState} from 'react'
import CreatePostView from './CreatePost.view'

const CreatePost = () => {

const [auth, setAuth] = useState(false)
    return (
        <div>
            <CreatePostView auth={auth} setAuth={setAuth} />
        </div>
    )
}

export default CreatePost
