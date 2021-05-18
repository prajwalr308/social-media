import React, { useContext } from 'react'
import { UserContext } from '../../contexts/user';
import { logout } from '../../services/auth';
import log from './logout.png'
import "./signoutbtn.css"

const SignoutBtn = () => {
    const [user,setUser] = useContext(UserContext).user;
    const signOut=()=>{
        logout();
        setUser(null);
    }
    return (
        <div>
            <img src={log} onClick={signOut}  className="logout"></img>
        </div>
    )
}

export default SignoutBtn
