
import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/user'
import './style.css'
import { signInWithGoogle } from '../../services/auth'

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
      <div class='g-sign-in-button'>
  <div class='content-wrapper'>
  <div class='logo-wrapper'>  
    <img src='https://developers.google.com/identity/images/g-logo.png' />
    </div>  
    <span class='text-container'> 
      <span>Sign in with Google</span>
    </span>
  </div>  
</div>
    )
}

export default SigninBtnView
