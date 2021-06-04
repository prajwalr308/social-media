import React from 'react'
import { useState } from 'react'

import { useEffect } from 'react'

import {db} from '../../firebase'


const UserPosts = ({userPosts}) => {
    
     const [post, setpost] = useState([])
    
    
    useEffect(async() => {
       
       console.log("userPosts",userPosts);
     
    }, [])

    return (
        <div>
           
           { userPosts!==[]?
           userPosts.map((posts)=>{
                console.log("posts",posts.username)
                return(<ul key={posts.username}><li>{posts.username}</li></ul>)
            }):""}
           
        </div>
    )
}

export default UserPosts
