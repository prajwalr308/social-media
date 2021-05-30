import React from 'react'
import { useEffect } from 'react'
import {db} from '../../firebase'

const UserPosts = () => {
    useEffect(() => {
        db.collection("posts").where("username","==","priya.md0002")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
            });
        })
    }, [])
    return (
        <div>
            this
        </div>
    )
}

export default UserPosts
