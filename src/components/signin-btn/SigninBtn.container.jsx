import React, { useContext, useState } from 'react'
import { UserContext } from '../../contexts/user'
import { signInWithGoogle } from '../../services/auth'
import SigninBtnView from './SigninBtn.view'

const SigninBtn = (props) => {

  return (
    <div>
      <SigninBtnView  />
    </div>
  )
}

export default SigninBtn
