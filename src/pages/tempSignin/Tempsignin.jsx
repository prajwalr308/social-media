import React from 'react'
import SigninBtn from '../../components/signin-btn'
import './temp.css'
import grad from '../../assets/blue.jpg'

const Tempsignin = () => {
   
    return (
        <div>
            <img src={grad} className="imagegrad" />
        <div class="wrapper">
        <div class="container">
          <div class="col-left">
            <div class="login-text">
              <h2>One click Login</h2>
              <p>
                Tried of typing passwords and username again and again
              </p>
         
            </div>
          </div>
          <div class="col-right">
            <div class="login-form">
              <h2>Login with one click</h2>
              <SigninBtn />
            </div>
          </div>
        </div>
      
      </div>
      </div>
      
    )
}

export default Tempsignin
