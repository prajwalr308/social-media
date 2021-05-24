
import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/user'
import './style.css'
import { signInWithGoogle } from '../../services/auth'
import btn from './btn.png'
import { useHistory } from "react-router-dom";


import firebase from 'firebase'

const SigninBtnView= ({}) => {
  let history = useHistory();

  const [user,setUser] = useContext(UserContext).user;
 
  const signInBtnClick=async()=>{
    let userAfterSignIn= await signInWithGoogle();
  
    if(userAfterSignIn){
      
      setUser(userAfterSignIn)
      console.log(userAfterSignIn);
      history.push("/");
     
    }  
 
     
 
 
  }
    return (
      <div  onClick={signInBtnClick}>
        <img  src={btn} className="g"   />
 
</div>
    )
}

export default SigninBtnView
