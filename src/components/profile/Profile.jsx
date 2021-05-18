import React, { useContext, useEffect } from 'react'
import "./profile.css"
import {UserContext} from '../../contexts/user'
import Navbar from '../navbar'


const Profile = ({user}) => {

 useEffect(() => {
     console.log(user)
 }, [user])
    return (

      <div>
            <Navbar />
            {user?<div>
            <div>
                <img />
                <img src={user.photoURL} />
            </div>
            <div>
                <h6>Name{user.displayName}</h6>
                <h6>Gmail{user.email}</h6>
                
            </div></div>:null}
        </div>
    )
}

export default Profile
