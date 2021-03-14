import React from 'react'
import styles from './comment.module.css'

const Comment = (props) => {
  const {username,comment}=props
    return (
        <div>
           <div className={styles.comment}>
      <p style={{fontFamily:"sans-serif",fontWeight:"400"}}>
        {username} 
        
      </p>
      <p style={{fontFamily:"sans-serif",fontSize:"0.9em"}}>{comment}</p>
    </div>
        </div>
    )
}

export default Comment
