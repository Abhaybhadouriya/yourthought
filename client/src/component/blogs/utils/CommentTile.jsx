import React from "react";
import styles from "./Comment.module.css";
import axios from "axios";
import { URL_BASE } from "../../../services/constant";
const CommentTile = (props) => {
  const deleteComment = () => {
     
    axios({
        url: `${URL_BASE}comment/deleteCommnet`,
        changeOrigin: true,
        method: "get",
        params: { docId: props.docId,userId:props.userId,id:props.id },
    }).then((res) => {
       
        props.getComment()
      });
       
 
    }
 
  return (
    <div className={styles.doComment}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: 22,
            fontWeight: 500,
          }}
        >
          {props.name}
        </span>
        {props.userId===props.postedBy?
        <button onClick={deleteComment} className={styles.btnCommentDel}>
          <i className="fa fa-trash" aria-hidden="true" />
        </button>:<></>}
      </div>
      <hr
        style={{
          width: "100%",
        }}
      />
      <span
        style={{
          width: "100%",
          fontSize: 20,
        }}
      >
        {props.commentText}
      </span>
      <hr
        style={{
          width: "100%",
        }}
      />
      <span
        style={{
          fontSize: 18,
          fontFamily: "cursive",
          fontWeight: 400,
        }}
      >
        {(new Date(props.date).toLocaleTimeString()) +" - "+(new Date(props.date).toLocaleDateString())}
      </span>
    </div>
  );
};

export default CommentTile;
