import React, { createRef, useContext, useEffect,useRef,useState } from "react";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import DeleteIcon from "@material-ui/icons/Delete";
import Comment from "../comment/Comment";
import { db, storage } from "../../firebase";
import { UserContext } from "../../contexts/user";
import CommentInput from "../commentInput/CommentInput";
import styles from './post.module.css'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 645,
    marginTop: "3%",
    marginLeft: "30%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Post(props) {
  const {
    profileUrl,
    username,
    id,
    userPhoto,
    photoUrl,
    caption,
    comments,
    likeCount,
    likes
  } = props;
  const classes = useStyles();

  
  const [commentbool, setCommentbool] = useState(false)
  const [user, setUser] = useContext(UserContext).user;
  const [likedBy, setLikedBy] = useState([])
  let currentUser;
  if (user) {
    currentUser = user.email.replace("@gmail.com", "");
  }
  useEffect(() => {
    console.log(comments)
  }, [])

  const deletePost = () => {
    if (username == currentUser) {
      var imgRef = storage.refFromURL(photoUrl);
      imgRef
        .delete()
        .then(() => {
          console.log(" image deleted");
        })
        .catch((error) => {
          console.log(error);
        });
      db.collection("posts")
        .doc(id)
        .delete()
        .then(() => {
          console.log("post deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const likeHandler =()=>{
    let userPresent;
    let likesArray;
    if(user){
      likedBy.push({
        likedBy:user.uid,
      })
    }
    
      db.collection("posts").doc(id).get().then((doc)=>{
        console.log(doc.data());
     
        try {
          likesArray=doc.data().likes;
          userPresent= likesArray.find(o => o.likedBy===`${user.uid}`)
            
        console.log(userPresent)
        } catch (error) {
          console.log(error)
        }
      
        
        
      }).then(()=>{
        if(userPresent){
          console.log(userPresent)
         }else{
           db.collection("posts").doc(id).update({
             likes:likedBy,
             likeCount:likeCount+1
           })
         }
        
       
      })
   


    
    console.log(userPresent)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src={userPhoto} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={deletePost}>
            <DeleteIcon />
          </IconButton>
        }
        title={username}
      />
      <CardMedia className={classes.media} image={photoUrl} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={likeHandler}>
          <FavoriteIcon />
        </IconButton>

        <IconButton onClick={()=>{
          setCommentbool(!commentbool);

        }} >
          <ChatBubbleIcon />
        </IconButton>
        
        <br></br>
      
      </CardActions>
      <div>
          {comments ? (
            comments.map((comment) => {
              return(<Comment username={comment.username} comment={comment.comment} />)
              
            })
          ) : (
            <></>
          )}
        </div>
        <div className={styles.empty}></div>
      <CommentInput commentbool={commentbool} id={id} comments={comments}  />
      <div className={styles.empty}></div>
    </Card>
  );
}
