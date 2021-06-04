import React from 'react'

import { useEffect } from 'react'

import {db} from '../../firebase'

const UserPosts = ({userPosts}) => {

    useEffect(() => {
       console.log(userPosts);
    }, [])

    return (
        <div>
            <p>put a grid of posts all data is in userPosts access them with userPosts.captions like that</p>
            {userPosts ? userPosts.map((posts)=>{
                return(<div>{posts.username}</div>)   //instaead put a img tag with src={user.photourl} and write grid css
            }):null

            }
        </div>
    )
}

export default UserPosts
