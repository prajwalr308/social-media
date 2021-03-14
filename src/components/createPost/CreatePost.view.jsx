import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user";
import SigninBtn from "../signin-btn";
import styles from "./style.module.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import "./extrastyles.css";
import { db, storage } from "../../firebase";
import makeid from "../../helper/functions";
import firebase from "firebase";

function SignedIn() {
  return (
    <div className={styles.signin}>
      <div className={styles.signinBtn}>
        {" "}
        <SigninBtn />
      </div>
      <p>Sign in to post</p>
    </div>
  );
}
const CreateAPost = (props) => {
  
  const [user, setUser] = useContext(UserContext).user;
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("")
  
  function textChangeHandler(e){
      setCaption(e.target.value);
  }
  function handleChange(e) {
    console.log(e);
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

      var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
      var imagePreview = document.getElementById("image-preview");
      imagePreview.src = selectedImageSrc;
      imagePreview.style.display = "block";
      console.log(e.target.files[0]);
    }
  }

  function uploadFileHandler() {
    if (image) {
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
                userPhoto:user.photoURL
              });
            });
            setCaption("");
            setProgress(0);
            setImage(null);
            document.getElementById("image-preview").style.display="none"
        }
      );
    }
  }
  return (
    <div className={styles.createPosts}>
      <div className={styles.createPostBox}>
        <p>create post</p>
        <div className="createPostContainer">
          <textarea
            className={styles.createPostText}
            rows="3"
            value={caption}
            onChange={textChangeHandler}
            placeholder="enter caption here"
          ></textarea>
          <div className={styles.imagePreview}>
            <img id="image-preview" alt="" />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
          <button
            className={styles.uploadButton}
            onClick={uploadFileHandler}
            style={{ color: caption ? "#000" : "lightgrey" }}
          >
            {`Upload ${progress !=0 ? progress : ""}`}
          </button>
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
