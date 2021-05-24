import React,{useContext,} from 'react'
import SigninBtn from '../../components/signin-btn'


const Signin = ({user}) => {
   console.log(user)
    return (
        <div>
          <SigninBtn />
        </div>
    )
}

export default Signin
