
import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/user'
import './style.scss'
import { signInWithGoogle } from '../../services/auth'
const SigninBtnView= ({}) => {

  const [user,setUser] = useContext(UserContext);
  const signInBtnClick=async()=>{
    let userAfterSignIn= await signInWithGoogle();
  
    if(userAfterSignIn){
      
      setUser(userAfterSignIn)
      console.log(userAfterSignIn);
    
     
    }  
  }
    return (
        <div className="google-btn" onClick={signInBtnClick}>
  <div className="google-icon-wrapper">
    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
  </div>
  <p className="btn-text"><b>Sign in with google</b></p>
</div>
    )
}

export default SigninBtnView
