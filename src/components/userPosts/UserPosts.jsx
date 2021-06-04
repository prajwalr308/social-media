import React from 'react'

import { useEffect } from 'react'

import {db} from '../../firebase'

const UserPosts = ({userPosts}) => {

    useEffect(() => {
       console.log(userPosts);
    }, [])

    return (
        <div>
            put a grid of posts all data is in userPosts access them with userPosts.captions like that
        </div>
    )
}

export default UserPosts
