import React, { useContext } from 'react'
import "./profile.css"
import {UserContext} from '../../contexts/user'


const Profile = () => {
    const [user, setUser] = useContext(UserContext).user;
    console.log(user)
    return (
        <div>
            <div>
                <img />
                <img src={user.photoURL} />
            </div>
            <div>
                <h6>Name{user.displayName}</h6>
                <h6>Gmail{user.email}</h6>
                
            </div>
        </div>
    )
}

export default Profile
