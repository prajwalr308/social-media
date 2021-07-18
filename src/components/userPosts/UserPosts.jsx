import React from 'react'
import { useState } from 'react'

import { useEffect } from 'react'

import {db} from '../../firebase'
import  './postss.css'


const UserPosts = ({userPosts}) => {
    
     const [post, setpost] = useState([])
    
    
    useEffect(async() => {
       
       console.log("userPosts",userPosts);
     
    }, [])

  
    return (
        <div className="userPosts"  >
        
           { userPosts!==[]?
           userPosts.map((posts)=>{
                console.log("posts",posts.username)
                return(<div  key={posts.username}>
                    
                    <div className="postviewdiv" >
                        <div className="postdiv">
                        <img src={posts.photoUrl} className="postview"/>
                        </div>
                    </div>
        </div>) // create grid for this
            }):""}
           
        </div>
    )
}

export default UserPosts
