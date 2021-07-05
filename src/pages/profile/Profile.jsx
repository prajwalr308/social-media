import React, { useContext, useEffect } from 'react'
import {UserContext} from '../../contexts/user'
import cover from './cover.jpg'
import Button from '@material-ui/core/Button';
import "./profile.css"
import SignoutBtn from '../../components/signout-btn/SignoutBtn'
import UserPosts from '../../components/userPosts/UserPosts'
import Navbar from '../../components/navbar'
import { useState } from 'react'
import {db} from '../../firebase'
import firebase from 'firebase'
import { useParams } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';



const Profile = () => {
    const {id} = useParams();
    var postArr=[]
  const [user,setUser] = useContext(UserContext).user;

    const [userPosts, setUserPosts] = useState([])
    const [userInfo, setUserInfo] = useState({name:'',email:''})
    const [isPresent, setisPresent] = useState(false)
 useEffect(async() => {
     console.log(user)

     let currentUser;
      
   
         if(user){
             
             currentUser = user.email.replace("@gmail.com", "");
             console.log(typeof currentUser)
             
         db.collection("posts").where("username","==",`${id}`)
         .get()
         .then((querySnapshot) => {
             querySnapshot.forEach((doc) => {
                 // doc.data() is never undefined for query doc snapshots
                 console.log(doc.id, " => ", doc.data());
                postArr.push(doc.data());
                userPosts.push(doc.data())
 
             });
         })
         
      
         console.log(postArr)
         db.collection("USERS").where("username","==",`${id}`)
         .get()
         .then((querySnapshot) => {
             querySnapshot.forEach((doc) => {
                 // doc.data() is never undefined for query doc snapshots
                 console.log(doc.id, " => ", doc.data());
                setUserInfo(doc.data());
 
             });
         })

         }else{
            console.log("null");
         }
        
       
   
 }, [user])

 function viewPosts(){
    setisPresent(true);
 }
    return (

      <div>
            <Navbar />
            {userInfo?<div className="profilebox">
                <div>
                <img  src={cover} className="profilecover"/>
                <img src={userInfo.photoUrl}  className="profileimg"/>
                </div>
                
            <div className="profiletext" >
                    
                        <h5>Username</h5>
                        <h6>{userInfo.name}</h6>
                    

                
            </div>
            </div>:null}
            <Button variant="contained" style={{backgroundColor: "#4aa4ff", color:"white"}} >Follow</Button>
            <Button variant="contained" style={{backgroundColor: "#4aa4ff", color:"white"}} onClick={viewPosts}>Post</Button>
           {isPresent? <UserPosts userPosts={userPosts} />
            :null}
            
        </div>
    )
}

export default Profile
