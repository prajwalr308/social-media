import React,{useContext,} from 'react'
import SigninBtn from '../../components/signin-btn'
import "./signin.css"
import pin from './logo.png'
import use from './user.png'


const Signin = ({user}) => {
   console.log(user)
    return (
        <div id="grad">
          <img src={pin} className="logo"/>
          <div className="cont">
          <h2>Follow the Future</h2>
          <img src={use}  className="user"/>
          <h4>ONE CLICK SIGN IN</h4>
          <SigninBtn />
          </div>
        </div>
    )
}

export default Signin
