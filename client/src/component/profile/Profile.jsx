import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URL_BASE } from "../../services/constant";
import { onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import HeaderBlog from "../header/HeaderBlog";
import Footer from "../footer/Footer";
import styles from "./Profile.module.css"
const Profile = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [likes, setLikes] = useState(undefined);
  const [comment, setComment] = useState(undefined);
  const [loaderSet, setloaderSet] = useState(true);
  const [FollowerCount, setFollowerCount] = useState(undefined);
  const [user, setUser] = useState();
  const [document, setDocument] = useState(undefined);

  const getLikes = () => {
    axios({
      url: `${URL_BASE}likes/viewLikeInProfile`,
      changeOrigin: true,
      method: "get",
      params: { userId: id },
    }).then((res) => {
      setLikes(res.data.data);
      console.log("DOCS", res.data.data);
    });
  };
  const getComment = () => {
    axios({
      url: `${URL_BASE}comment/viewCommentOnProfile`,
      changeOrigin: true,
      method: "get",
      params: { userId: id },
    }).then((res) => {
      setComment(res.data.data);
      // console.log("DOCS", res.data.data);
    });
  };
  const getDocument = () => {
    axios({
      url: `${URL_BASE}documents/viewDocumentListUser`,
      changeOrigin: true,
      method: "get",
      params: { userId: id },
    }).then((res) => {
      // setComment(res.data.data)
      setDocument(res.data);
      // console.log("DOCS", res.data);
    });
  };
  const getFollower = () => {
    axios({
      url: `${URL_BASE}followFunction/viewFollowers`,
      changeOrigin: true,
      method: "get",
      params: { followerId: id },
    }).then((res) => {
      // setComment(res.data.data)
      // console.log("DOCS", res.data.data);
      getFollowing(res.data.data);
    });
  };
  const getFollowing = () => {
    axios({
      url: `${URL_BASE}followFunction/viewFollowed`,
      changeOrigin: true,
      method: "get",
      params: { followedById: id },
    }).then((res) => {
      // setComment(res.data.data)
      // console.log("DOCS", res.data);
      getFollower(res.data.data);
    });
  };

  useEffect(() => {
    onAuthStateChanged(app, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setloaderSet(false);
        getLikes();
        getComment();
        getDocument();
        getFollower();
        getFollowing();
      }
    });

    // eslint-disable-next-line
  }, [id]);

  const LikesComp = (props) => {
    return (
      <div className={styles.outer}>
        <h2 className={styles.title}>{props.title}</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p  className={styles.tags}>{new Date(props.date).toLocaleTimeString()+"-"+new Date(props.date).toLocaleDateString()}</p>
          <Link  to={`/blogs/${props.docId}`}>
            <button className={styles.btnShow}><i className="fa fa-eye"/> View</button>
          </Link>
        </div>
        <p className={styles.tags}>{props.tags}</p>
      </div>
    );
  };
  return (
    <>
      <HeaderBlog />
      <div className={styles.profileContent}>

    
      {likes !== undefined ? (
        likes.map((e) => {
          return (
            <LikesComp
              title={e.Document["title"]}
              tags={e.Document["tags"]}
              date={e.Document["createdAt"]}
              docId={e.docId}
            />
          );
        })
      ) : (
        <></>
      )}  
      
      
      </div>

      <Footer />
    </>
  );
};

export default Profile;
