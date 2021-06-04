import React, { useContext, useEffect } from 'react'
import {UserContext} from '../../contexts/user'
import cover from './cover.jpg'

import "./profile.css"
import SignoutBtn from '../../components/signout-btn/SignoutBtn'
import UserPosts from '../../components/userPosts/UserPosts'
import Navbar from '../../components/navbar'
import { useState } from 'react'
import {db} from '../../firebase'
import firebase from 'firebase'



const Profile = () => {


  const [user,setUser] = useContext(UserContext).user;

    const [userPosts, setUserPosts] = useState(null)
 useEffect(async() => {
     console.log(user)

     let currentUser;
     await firebase.auth().onAuthStateChanged(user=>{
        if (user) {
            // store the user on local storage
            setUser(user)
            
        } 
    })
   
         if(user!==null){
             currentUser = user.email.replace("@gmail.com", "");
             console.log(typeof currentUser)
             const postArr=[]
         db.collection("posts").where("username","==",`${currentUser}`)
         .get()
         .then((querySnapshot) => {
             querySnapshot.forEach((doc) => {
                 // doc.data() is never undefined for query doc snapshots
                 console.log(doc.id, " => ", doc.data());
                postArr.push(doc.data());
 
             });
         })
         setUserPosts(postArr);
         console.log(userPosts)
         }else{
            console.log("null");
         }
        
       
   
 }, [user])
    return (

      <div>
            <Navbar />
            {user?<div className="profilebox">
                <div>
                <img  src={cover} className="profilecover"/>
                <img src={user.photoURL}  className="profileimg"/>
                </div>
                
            <div className="profiletext">
                <h5>Name</h5>
                <h6>{user.displayName}</h6>
                <h5>Email</h5>
                <h6>{user.email}</h6>
                
            </div>
            </div>:null}
            <UserPosts userPosts={userPosts} />
        </div>
    )
}

export default Profile
