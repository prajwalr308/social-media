import React,{useContext,} from 'react'
import SigninBtn from '../../components/signin-btn'
import "./signin.css"
import pin from './logo.png'
import use from './user.png'
import login from  './login.png'


const Signin = ({user}) => {
   console.log(user)
    return (
        <div id="grad">
          <div className="displays">
          <img src={pin} className="logo"/>
          <SigninBtn />
          <img src={login}  className="login"/>
          </div>
          
              <div className="cont">
                  <img src={use}  className="user"/>
                  <h4>ONE CLICK SIGN IN</h4>
                  </div>
        </div>
    )
}

export default Signin