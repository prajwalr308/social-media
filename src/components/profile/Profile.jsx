import React, { useContext, useEffect } from 'react'
import {UserContext} from '../../contexts/user'
import cover from './cover.jpg'
import Navbar from '../navbar/Navbar'
import "./profile.css"
import SignoutBtn from '../signout-btn/SignoutBtn'



const Profile = ({user}) => {

 useEffect(() => {
     console.log(user)
 }, [user])
    return (

      <div>
            <Navbar />
            {user?<div className="profilebox">
                <div>
                <img  src={cover} className="profilecover"/>
                <img src={user.photoURL}  className="profileimg"/>
                </div>
                
            <div className="profiletext">
                <h5>Name</h5>
                <h6>{user.displayName}</h6>
                <h5>Email</h5>
                <h6>{user.email}</h6>
                
            </div>
            </div>:null}
        </div>
    )
}

export default Profile
