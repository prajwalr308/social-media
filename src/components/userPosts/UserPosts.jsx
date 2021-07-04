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
                return(<div key={posts.username}><img src={posts.photoUrl}/></div>)
            }):""}
           
        </div>
    )
}

export default UserPosts
