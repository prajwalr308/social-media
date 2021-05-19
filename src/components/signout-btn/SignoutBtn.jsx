import React, { useContext } from 'react'
import { UserContext } from '../../contexts/user';
import { logout } from '../../services/auth';


const SignoutBtn = () => {
    const [user,setUser] = useContext(UserContext).user;
    const signOut=()=>{
        logout();
        setUser(null);
    }
    return (
        <div>
        </div>
    )
}

export default SignoutBtn
