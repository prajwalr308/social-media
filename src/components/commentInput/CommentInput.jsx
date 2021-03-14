import React, { createRef, useContext, useRef, useState } from "react";
import { UserContext } from "../../contexts/user";
import { db } from "../../firebase";
import './comment.css'

const CommentInput = (props) => {
 const {comments,id}=props
 const [comment, setComment] = useState("")
 const [commentArray, setcommentArray] = useState(comments ? comments : [])
 const [user, setUser] = useContext(UserContext).user;
    function handleChange(e){
        setComment(e.target.value)
    }
    function postComment(){
      if(comment != ""){
        commentArray.push({
          comment:comment,
          username: user.email.replace("@gmail.com", "")
        })
       db.collection("posts").doc(id).update({
         comments:commentArray
       }).then(()=>{
         setComment("")
       }).catch((error)=>{
         console.log(error);
       }) 
      }
       
    }
  return (
    <div className={props.commentbool ? `commentInput` : `commentInput__displayNone`}>
      <textarea className="commentInput__textarea" rows="1" id="input" placeholder="write a comment..." onChange={handleChange} ></textarea>
      <button className="commentInput__btn" onClick={postComment}>post</button>
    </div>
  );
};

export default CommentInput;
