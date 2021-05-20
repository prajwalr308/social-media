import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user";
import SigninBtn from "../signin-btn";
import styles from "./style.module.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import "./extrastyles.css";
import { db, storage } from "../../firebase";
import makeid from "../../helper/functions";
import Resizer from "react-image-file-resizer";
import upload from './upload.png'



import firebase from "firebase";

function SignedIn() {
  return (
    <div className={styles.signin}>
      <div className={styles.signinBtn}>
        {" "}
        
      </div>
     
    </div>
  );
}
const CreateAPost = (props) => {
  
  const [user, setUser] = useContext(UserContext).user;
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");
  const [type, setType] = useState('')
  const [typeCheck, setTypeCheck] = useState('');
  const [istype, setistype] = useState(true)
 
  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });
  function textChangeHandler(e){
      setCaption(e.target.value);
  }
 async function handleChange(e) {
    console.log(e);
    const imageFile =e.target.files[0].type;
    console.log(imageFile)
    const imageTypes=['image/png','image/jpeg']
    const typeExist=imageTypes.find(element => imageFile==element);
    console.log("56 type exists",typeExist)
    await setTypeCheck(typeExist);


    if (e.target.files[0]&&e.target.files[0].type==typeExist) {
      const file = e.target.files[0];
      const image = await resizeFile(file);
      setImage(image);
      setistype(true);
      var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
      var imagePreview = document.getElementById("image-preview");
      imagePreview.src = selectedImageSrc;
      imagePreview.style.display = "block";
      console.log("type",e.target.files[0]);
      setType(e.target.files[0].type)
    }else{
      setistype(false);
      setImage(e.target.files[0]);

      var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
      var videoPreview = document.getElementById("video-preview");
      videoPreview.src = selectedImageSrc;
      videoPreview.style.display = "block";
      console.log("type",e.target.files[0]);
      setType(e.target.files[0].type)
    }
  }

  function uploadFileHandler() {
    if (image&&type==typeCheck) {
      let imageName = makeid(10);
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
         
            storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                photoUrl: imageUrl,
                username: user.email.replace("@gmail.com",""),
                userPhoto:user.photoURL,
                likeCount:0,
                likes:[],
                type:type
              });
            });
            setCaption("");
            setProgress(0);
            setImage(null);
            document.getElementById("image-preview").style.visibility="hidden";
            
          
          
        },
     
      );
    }else if(image&&type=='video/mp4'){
      let videoName = makeid(10);
      const uploadTask = storage.ref(`videos/${videoName}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
         
            storage
            .ref("videos")
            .child(`${videoName}`)
            .getDownloadURL()
            .then((vUrl) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                photoUrl: vUrl,
                username: user.email.replace("@gmail.com",""),
                userPhoto:user.photoURL,
                likeCount:0,
                likes:[],
                type:type
              });
            });
            setCaption("");
            setProgress(0);
            setImage(null);
            document.getElementById("image-preview").style.display='none'
            document.getElementById("video-preview").style.visibility="hidden";;
          
          
        },
     
      ); 
    }
  }
  return (
    <div className={styles.createPosts} id="createpost">
      <div className={styles.createPostBox}>
        <h5>Create post</h5>
        <div className="createPostContainer">
        <div className={styles.imagePreview} style={{display:" grid",
    placeItems:"center"}} >
            {istype ?<img id="image-preview" alt="" />:
            <video width="320" height="240" controls>
  <source id="video-preview"  type="video/mp4" />
  
 
</video>}
          </div>
          <textarea
            className={styles.createPostText}
            rows="3"
            value={caption}
            onChange={textChangeHandler}
            placeholder="Caption"
          ></textarea>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between"}}>
          <div className={styles.createPostImageUpload}>
            <label htmlFor="fileInput">
              <AddAPhotoIcon style={{ cursor: "pointer" }} />
            </label>

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <img src={upload} onClick={uploadFileHandler}  className={styles.up}>
          
          </img>
          
        </div>
      </div>
    </div>
  );
};

const CreatePostView = (props) => {
  const { caption, setCaption, clickHandler } = props;
  const [user, setUser] = useContext(UserContext).user;
  return <div>{user ? <CreateAPost /> :<SignedIn />}</div>;
};

export default CreatePostView;
