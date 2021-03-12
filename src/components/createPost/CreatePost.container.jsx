import React,{useState} from 'react'
import CreatePostView from './CreatePost.view'

const CreatePost = () => {


    const [caption, setCaption] = useState("")
  
    function textChangeHandler(e){
        setCaption(e.target.value);
    }
    function uploadFileHandler(e){
        console.log(e.target);
    }
 
    return (
        <div>
            <CreatePostView 
            caption={caption}
            setCaption={setCaption}
            textChangeHandler={textChangeHandler} 
            uploadFileHandler={uploadFileHandler}
            

            />
        </div>
    )
}

export default CreatePost
