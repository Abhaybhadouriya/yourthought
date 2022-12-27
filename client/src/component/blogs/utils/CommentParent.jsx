import React, { useState, useRef } from "react";
import styles from "./Comment.module.css";
import CommentTile from "./CommentTile";
import { app } from "../../../firebase";
import axios from "axios";
import { URL_BASE } from "../../../services/constant";
const CommentParent = (props) => {
    // eslint-disable-next-line
  // const [comment, setComment] = useState("");
  const inputComment = useRef();
  const postComment = () => {
     
    axios({
        url: `${URL_BASE}comment/comment`,
        changeOrigin: true,
        method: "post",
        params: { docId: props.docId,userId:props.userId,commentText:inputComment.current.value },
    }).then((res) => {
         inputComment.current.value=""
        props.getComment()
      });
       
 
    }
 
  
  return (
    <div className={styles.outerP}>
      <div className={styles.doComment}>
        <textarea
          placeholder="Say something here..."
          ref={inputComment}
          className={styles.textArea}
        />
        <button onClick={() => postComment()} className={styles.btnComment}>
          Comment
        </button>
        {console.log(app)}
      </div>
      {props.comment !== undefined ? (
        props.comment.map((e, i) => {
          return (
            <CommentTile
              key={i}
              name={e["User"]["name"]}
              commentText={e["commentText"]}
              date={e["createdAt"]}
              postedBy={e["userId"]}
              userId={props.userId}
              docId={e["docId"]}
              id={e["id"]}
              getComment={props.getComment}
            />
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentParent;
