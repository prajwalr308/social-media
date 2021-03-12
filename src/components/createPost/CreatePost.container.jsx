import React,{useState} from 'react'
import CreatePostView from './CreatePost.view'

const CreatePost = () => {


    const [caption, setCaption] = useState("")
  
    function textChangeHandler(e){
        setCaption(e.target.value);
    }
  
 
    return (
        <div>
            <CreatePostView 
          
            textChangeHandler={textChangeHandler} 
         
            

            />
        </div>
    )
}

export default CreatePost
