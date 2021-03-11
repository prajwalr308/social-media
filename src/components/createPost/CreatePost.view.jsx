import React from 'react'
import SigninBtn from '../signin-btn'
import styles from './style.module.css';

function SignedIn(){
    return <div className={styles.signin}>
        <div className={styles.signinBtn}> <SigninBtn /></div>
        <p>Sign in to post</p>
    </div>
}
const SignedOut =()=>{
    return <div>
        create post
    </div>
}

const CreatePostView = (props) => {
    const {auth,setAuth} =props
 return (
        <div>
            <button onClick={()=>{setAuth(!auth)}}>click auth</button>
            { auth ? <SignedIn /> : <SignedOut />}
        </div>
    )
}

export default CreatePostView
