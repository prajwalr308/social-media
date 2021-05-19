
import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/user'
import './style.css'
import { signInWithGoogle } from '../../services/auth'
import btn from './btn.png'

import firebase from 'firebase'

const SigninBtnView= ({}) => {

  const [user,setUser] = useContext(UserContext).user;
 
  const signInBtnClick=async()=>{
    let userAfterSignIn= await signInWithGoogle();
  
    if(userAfterSignIn){
      
      setUser(userAfterSignIn)
      console.log(userAfterSignIn);
    
     
    }  
 
     
 
 
  }
    return (
      <div  onClick={signInBtnClick}>
        <img  src={btn} className="g"   />
 
</div>
    )
}

export default SigninBtnView
