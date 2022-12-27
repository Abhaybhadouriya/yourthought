import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../footer/Footer";
import HeaderBlog from "../header/HeaderBlog";
import { URL_BASE } from "../../services/constant";
import CommentParent from "./utils/CommentParent";
import styles from "./BlogReader.module.css";
import LoaderPage from "../LoaderPage";
import SorryNoBlogs from "./SorryNoBlogs";
import { onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";

const BlogReader = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState(undefined);
  const [likes, setLikes] = useState(undefined);
  const [comment, setComment] = useState(undefined);
  const [loaderSet, setloaderSet] = useState(true);
  const [user, setUser] = useState();
  const [FollowerCount, setFollowerCount] = useState(0)
  const likePost = () => {
    axios({
      url: `${URL_BASE}likes/likes`,
      changeOrigin: true,
      method: "get",
      params: { docId: id, userId: user.uid },
    }).then((res) => {
      setLikes(res.data.totLikes);
    });
  };
  const getLikes = () => {
    axios({
      url: `${URL_BASE}likes/viewLikePost`,
      changeOrigin: true,
      method: "get",
      params: { docId: id },
    }).then((res) => {
      setLikes(res.data.totLikes);
    });
  };
  const getComment = () => {
    axios({
      url: `${URL_BASE}comment/viewCommentOnPost`,
      changeOrigin: true,
      method: "get",
      params: { docId: id },
    }).then((res) => {
      // console.log(res.data.data);
      setComment(res.data.data);
    });
  };
  const getFollower = (data) =>{
    axios({
      url: `${URL_BASE}followFunction/viewFollowCount`,
      changeOrigin: true,
      method: "get",
      params: { followerId: data },
    }).then((res) => {
      // console.log(res.data);
      setFollowerCount(res.data.data);
    });
  }
  useEffect(() => {
    onAuthStateChanged(app, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        if (id !== undefined) {
          axios({
            url: `${URL_BASE}documents/viewDocument`,
            changeOrigin: true,
            method: "get",
            params: { docId: id },
          })
            .then((res) => {
              setContent(res.data.doc);
              console.log("DOCS", res.data.doc);
              getFollower(res.data.doc.userId);
            })
            .catch((e) => {
              setloaderSet(false);
            });
          getComment();
          getLikes();
        
        }
        setUser(user);
      }
    });

    // eslint-disable-next-line
  }, [id]);

  const doFollow = () =>{
    axios({
      url: `${URL_BASE}followFunction/doFollow`,
      changeOrigin: true,
      method: "get",
      params: { followerId: content.userId, followedById:user.uid },
    }).then((res) => {
      // console.log(res.data);
      setFollowerCount(res.data.totFollower);
    });
  }

  return (
    <>
      <HeaderBlog />
      {loaderSet ? (
        <>
          {content !== undefined ? (
            <>
              <div className={styles.outer}>
                <h1 className={styles.title}>{content.title}</h1>
                <p className={styles.content}>{content.content}</p>
                {/* <p className={styles.date}>{ (new Date(content.date).toLocaleTimeString()) +"   "+(new Date(props.date).toLocaleDateString())}</p> */}

                <p className={styles.author}>
                  {" "}
                  <Link  to={`/profile/${content.userId}`}>
                  <button className={styles.authorSpan}>Post by ~ {content.name}</button>
                  </Link>
                  
                </p>
                <div className={styles.divLike}>
                  <button onClick={likePost} className={styles.likeBtn}>
                    <i className="fa fa-thumbs-up" aria-hidden="true" /> {likes}{" "}
                    Like
                  </button>
                  <button onClick={doFollow} className={styles.followBtn}>
                    <i className="fa fa-rss" aria-hidden="true" />{FollowerCount} Follow
                  </button>
                </div>
              </div>
              {/* {(new Date(props.date).toLocaleTimeString()) +"   "+(new Date(props.date).toLocaleDateString())} */}
              <CommentParent userId={user.uid} docId={id} comment={comment} getComment={getComment} />
            </>
          ) : (
            <LoaderPage />
          )}
        </>
      ) : (
        <SorryNoBlogs />
      )}
      <Footer />
    </>
  );
};

export default BlogReader;
