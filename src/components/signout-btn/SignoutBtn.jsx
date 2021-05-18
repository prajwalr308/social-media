import React, { useContext } from 'react'
import { UserContext } from '../../contexts/user';
import { logout } from '../../services/auth';
import log from './logout.png'

const SignoutBtn = () => {
    const [user,setUser] = useContext(UserContext).user;
    const signOut=()=>{
        logout();
        setUser(null);
    }
    return (
        <div>
            <img src={log} onClick={signOut}  style={{width: "100px"}}></img>
        </div>
    )
}

export default SignoutBtn
