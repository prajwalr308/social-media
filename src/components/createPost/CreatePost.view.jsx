import React, { useContext,useState } from "react";
import { UserContext } from "../../contexts/user";
import SigninBtn from "../signin-btn";
import styles from "./style.module.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import './extrastyles.css'

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
  const {
    caption,
    setCaption,
    textChangeHandler,
    uploadFileHandler,
   
  } = props;
  const [image, setImage] = useState(null)
function handleChange(e){
        console.log(e);
        if(e.target.files[0]){
            setImage(e.target.files[0])

            var selectedImageSrc=URL.createObjectURL(e.target.files[0])
            var imagePreview = document.getElementById("image-preview")
            imagePreview.src=selectedImageSrc;
            imagePreview.style.display="block";
            console.log(e.target.files[0])
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
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

const CreatePostView = (props) => {
  const { caption, setCaption, clickHandler } = props;
  const [user, setUser] = useContext(UserContext).user;
  return <div>{user ? <SignedIn /> : <CreateAPost />}</div>;
};

export default CreatePostView;
