import React, { createRef, useContext, useEffect,useRef,useState } from "react";
import { makeStyles, StylesProvider, } from "@material-ui/core/styles";
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
import styles from './post.module.css';
import ReactPlayer from 'react-player'
import {Modal,SimpleModal,} from '@material-ui/core/';
import { signInWithGoogle } from "../../services/auth";
import SigninBtn from "../signin-btn";






const useStyles = makeStyles((theme) => ({
 
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
  paper: {
    position: 'absolute',
    top:'50%',
   
    left:'10%',
    
    width: '60%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    ['@media (min-width:780px)']: {
      width: 400,
      left:'30%',
    }
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
    likes,type
  } = props;
  const classes = useStyles();

  
  const [commentbool, setCommentbool] = useState(false)
  const [user, setUser] = useContext(UserContext).user;
  const [likedBy, setLikedBy] = useState([])
  const [typeCheck, setTypeCheck] = useState('');
  const [isLiked, setisLiked] = useState(false)
  let currentUser;
  if (user) {
    currentUser = user.email.replace("@gmail.com", "");
  }
  useEffect(() => {
    console.log(comments)
   
 
    const imageTypes=['image/png','image/jpeg']
    const typeExist=imageTypes.find(element => type==element);
    console.log("56 type exists",typeExist)
    setTypeCheck(typeExist);
  }, [])

  
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="simple-modal-title">Warning</h2>
      <p id="simple-modal-description">
        Log In to delete the post
      </p>
      <SigninBtn />
    </div>
  );
  

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
        email:user.email
      })
    }
    
      db.collection("posts").doc(id).get().then((doc)=>{
        console.log(doc.data());
     
        try {
          likesArray=doc.data().likes;
          userPresent= likesArray.find(o => o.likedBy===`${user.uid}`)
            
        console.log("167",userPresent)
        } catch (error) {
          console.log(error)
        }
      
        
        
      }).then(()=>{
        if(user){

       
        if(userPresent){
          var newArry=likedBy.filter(o => o.likedBy!==`${user.uid}`);
          console.log("new",newArry);
       
     
            db.collection("posts").doc(id).update({
              likes:newArry,
              likeCount:likeCount-1
            })
            setisLiked(false)
          
          
         }else{
           db.collection("posts").doc(id).update({
             likes:likedBy,
             likeCount:likeCount+1
           })
         }
        }
       
      })
   

setisLiked(true);
    
    console.log(userPresent)
  }

  return (
    <div className={styles.post}>
   { type==typeCheck? <Card className={styles.root}   >
   
    <CardHeader
      
      avatar={
        <a href={`/profile/${username}`} style={{display:"flex"}}>
        <Avatar aria-label="recipe" className={classes.avatar}>
          <img src={userPhoto} />
        
        </Avatar>
        <p style={{marginLeft:10}}>{username}</p>
        </a>
      }
     
      
      action={!user?
        <IconButton aria-label="settings" onClick={() => {deletePost();handleOpen()}}>
          <DeleteIcon />
        </IconButton>: <IconButton aria-label="settings" onClick={deletePost}>
          <DeleteIcon />
        </IconButton>
      }
     
    />
   
      
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <img className={styles.image} src={photoUrl} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={likeHandler}>
          <FavoriteIcon style={isLiked?{color:"#42abfc"}:{color:"#757575"}} />
          <p>{likeCount}</p>
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
    </Card>:<Card className={styles.root} >
      <CardHeader 
        avatar={
          <a href={`/profile/${username}`} style={{display:"flex"}}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src={userPhoto} />
         
          </Avatar>
          <p style={{marginLeft:10}}>{username}</p>
          </a>
        }
        action={
          <IconButton aria-label="settings" onClick={() => {deletePost();handleOpen()}}>
            <DeleteIcon />
          </IconButton>
        }
        title={username}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <div className={styles.wrapper}>
        <ReactPlayer
        controls playIcon url={photoUrl}
         
          width='100%'
          height='100%'
          className={styles.player}
        />
      </div>
  
     
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton  aria-label="add to favorites" onClick={likeHandler}>
          <FavoriteIcon style={isLiked?{color:"#42abfc"}:{color:"#757575"}} />
          <p>{likeCount}</p>
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
    </Card>}
    </div>
    
  );
}
