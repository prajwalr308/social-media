import React from 'react'

const Comment = ({username,comment}) => {
    return (
        <div>
           <div className="comment">
      <p>
        <strong>{username}</strong> {comment}
      </p>
    </div>
        </div>
    )
}

export default Comment
