import React from 'react'
import { useState } from 'react';

import { useEffect } from 'react'

import {db} from '../../firebase'

const UserPosts = ({user}) => {
    let currentUser;
const [users, setUsers] = useState(null)
    useEffect(async() => {
        await setUsers(user)
        if(user){
            currentUser = user.email.replace("@gmail.com", "");
            console.log(currentUser);
        db.collection("posts").where("username","==",currentUser)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());

            });
        })
        }
        console.log(users);
    }, [users])
    return (
        <div>
            this
        </div>
    )
}

export default UserPosts
