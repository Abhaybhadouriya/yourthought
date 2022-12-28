import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { URL_BASE } from "../../services/constant";
import { onAuthStateChanged } from "firebase/auth";
import { app } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import HeaderBlog from "../header/HeaderBlog";
import Footer from "../footer/Footer";
import styles from "./Profile.module.css";
import LoaderPage from "../LoaderPage";
const Profile = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [likes, setLikes] = useState(undefined);
  const [comment, setComment] = useState(undefined);
  const [loaderSet, setloaderSet] = useState(true);
  const [follower, setfollower] = useState(undefined);
  const [following, setfollowing] = useState(undefined);
  const [user, setUser] = useState();
  const [profileUser,setProfileUser] = useState(undefined);
  const [document, setDocument] = useState(undefined);

  const getLikes = () => {
    axios({
      url: `${URL_BASE}likes/viewLikeInProfile`,
      changeOrigin: true,
      method: "get",
      params: { userId: id },
    }).then((res) => {
      setLikes(res.data.data);
      // console.log("DOCS", res.data.data);
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
      // setCo/mment(res.data.data)
      setDocument(res.data.data);
      console.log("DOCS", res.data.data);
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
      console.log("DOCS", res.data.data);
      setfollower(res.data.data);
    });
  };
  const doUnPublish = (e) => {
    axios({
      url: `${URL_BASE}documents/unpublishDocument`,
      changeOrigin: true,
      method: "get",
      params: { docId: e },
    }).then((res) => {
      // setComment(res.data.data)
      getDocument();
    });
  };
  const doDelete = (e) => {
    axios({
      url: `${URL_BASE}documents/deleteDocument`,
      changeOrigin: true,
      method: "get",
      params: { docId: e },
    }).then((res) => {
      // setComment(res.data.data)
      getDocument();
    });
  };
  const doPublish = (e) => {
    axios({
      url: `${URL_BASE}documents/publishDocument`,
      changeOrigin: true,
      method: "get",
      params: { docId: e },
    }).then((res) => {
      // setComment(res.data.data)
      getDocument();
    });
  };
  const getUser = (e) => {
    axios({
      url: `${URL_BASE}user/getUser`,
      changeOrigin: true,
      method: "get",
      params: { uid: id },
    }).then((res) => {
       setProfileUser(res.data.data)
      // setUser(res)
      // console.log(res.data.data)
    });
  };
  const getFollowing = () => {
    console.log(id)
    axios({
      url: `${URL_BASE}followFunction/viewFollowers`,
      changeOrigin: true,
      method: "get",
      params: { followerId: id },
    }).then((res) => {
      // setComment(res.data.data)
      // console.log("DOCS", res.data.data);
      setfollowing(res.data.data);
    });
  };

  useEffect(() => {
    onAuthStateChanged(app, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        // console.log(user.uid)
        setUser(user);
        getUser()
        getLikes();
        getComment();
        getDocument();
        getFollower();
        getFollowing();
        getFollowerCount();
        setloaderSet(false);
      }
    });

    // eslint-disable-next-line
  }, [id]);
  const FollowerComp = (props) => {
    return (
      <div className={styles.outer}>
        <h2 className={styles.title}>{props.title}</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles.tags}>
            {new Date(props.date).toLocaleDateString()}
          </p>
          <Link to={`/profile/${props.userId}`}>
            <button className={styles.btnShow}>
              <i className="fa fa-eye" /> View
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const DocumentComp = (props) => {
    return (
      <div className={styles.outer}>
        <h2 className={styles.title}>{props.title}</h2>

        {user ? (
          props.userId === user.uid ? (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => doDelete(props.docId)}
                className={styles.btnShow}
              >
                <i className="fa fa-trash" /> Delete
              </button>

              {props.published ? (
                <button
                  onClick={() => doUnPublish(props.docId)}
                  className={styles.btnShow}
                >
                  <i className="fa fa-eye-close" /> Unpublish
                </button>
              ) : (
                <button
                  onClick={() => doPublish(props.docId)}
                  className={styles.btnShow}
                >
                  <i className="fa fa-eye-close" /> Publish
                </button>
              )}
            </div>
          ) : (
            <></>
          )
        ) : (
          ""
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {user ? (
            props.userId === user.uid ? (
              <Link to={`/doblogs/${props.docId}`}>
                <button className={styles.btnShow}>
                  <i className="fa fa-edit" /> Edit
                </button>
              </Link>
            ) : (
              <></>
            )
          ) : (
            ""
          )}
          <Link to={`/blogs/${props.docId}`}>
            <button className={styles.btnShow}>
              <i className="fa fa-eye" /> View
            </button>
          </Link>
        </div>
      </div>
    );
  };
  const FollowingComp = (props) => {
    return (
      <div className={styles.outer}>
        <h2 className={styles.title}>{props.title}</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles.tags}>
            {new Date(props.date).toLocaleDateString()}
          </p>
          <Link to={`/profile/${props.userId}`}>
            <button className={styles.btnShow}>
              <i className="fa fa-eye" /> View
            </button>
          </Link>
        </div>
      </div>
    );
  };

  const LikesComp = (props) => {
    return (
      <div className={styles.outer}>
        <h2 className={styles.title}>{props.title}</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles.tags}>
            {new Date(props.date).toLocaleTimeString() +
              "-" +
              new Date(props.date).toLocaleDateString()}
          </p>
          <Link to={`/blogs/${props.docId}`}>
            <button className={styles.btnShow}>
              <i className="fa fa-eye" /> View
            </button>
          </Link>
        </div>
        <p className={styles.tags}>Tags ~ {props.tags}</p>
      </div>
    );
  };

  const CommentComp = (props) => {
    return (
      <div className={styles.outer}>
        <h2 className={styles.title}>{props.title}</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p className={styles.tags}>
            {new Date(props.date).toLocaleTimeString() +
              "-" +
              new Date(props.date).toLocaleDateString()}
          </p>
          <Link to={`/blogs/${props.docId}`}>
            <button className={styles.btnShow}>
              <i className="fa fa-eye" /> View
            </button>
          </Link>
        </div>
        <p className={styles.tags}>{props.comment}</p>
        <p className={styles.tags}>Tags ~ {props.tags}</p>
      </div>
    );
  };
  const [FollowerCount, setFollowerCount] = useState(0);
  const doFollow = () => {
    axios({
      url: `${URL_BASE}followFunction/doFollow`,
      changeOrigin: true,
      method: "get",
      params: { followerId: id, followedById: user.uid },
    }).then((res) => {
      // console.log(res.data);
      getFollower()
      getFollowing()
      setFollowerCount(res.data.totFollower);
    });
  };
  const getFollowerCount = () =>{
    axios({
      url: `${URL_BASE}followFunction/viewFollowCount`,
      changeOrigin: true,
      method: "get",
      params: { followerId: id },
    }).then((res) => {
      // console.log(res.data);
      setFollowerCount(res.data.data);
    });
  }
  const ProfileComp = () => {
    return (
      <div className={styles.outer} style={{ marginTop: 10 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 2 }}>{profileUser.displayName}</h2>
          <h3 style={{ margin: 2 }}>{profileUser.email}</h3>
          {user.uid!==id?
          <button onClick={doFollow} className={styles.followBtn}>
            <i className="fa fa-rss" aria-hidden="true" />
            {FollowerCount} Follow
          </button>:<button  className={styles.followBtn}>
            <i className="fa fa-rss" aria-hidden="true" />
            {FollowerCount} Follow
          </button>}
        </div>
      </div>
    );
  };
  return (
    <>
      <HeaderBlog />
  {loaderSet?<LoaderPage/>:
      <div className={styles.profileContent}>
        {profileUser ? <ProfileComp /> : <></>}
        {document !== undefined ? (
          <>
            <h2>Blogs</h2>
            {document.map((e, i) => {
              if (
                (e.userId !== user.uid && e.published === true) ||
                e.userId === user.uid
              ) {
                return (
                  <DocumentComp
                    key={i}
                    title={e.title}
                    tags={e.tags}
                    published={e.published}
                    docId={e.id}
                    createdAt={e.createdAt}
                    userId={e.userId}
                  />
                );
              }
            })}
          </>
        ) : (
          <></>
        )}
        {following !== undefined ? (
          <>
            <h2>Following</h2>
            {following.map((e, i) => {
              return (
                <FollowingComp
                  key={i}
                  title={e.User.name}
                  date={e.createdAt}
                  userId={e.followedById}
                />
              );
            })}
          </>
        ) : (
          <></>
        )}
        {follower !== undefined ? (
          <>
            <h2>Followers</h2>
            {follower.map((e, i) => {
              return (
                <FollowerComp
                  key={i}
                  title={e.User.name}
                  date={e.createdAt}
                  userId={e.followedById}
                />
              );
            })}
          </>
        ) : (
          <></>
        )}
        {comment !== undefined ? (
          <>
            <h2>Comment</h2>
            {comment.map((e, i) => {
              return (
                <CommentComp
                  key={i}
                  docId={e.docId}
                  comment={e.commentText}
                  date={e.Document.createdAt}
                  title={e.Document.title}
                  tags={e.Document.tags}
                />
              );
            })}
          </>
        ) : (
          <></>
        )}
        {likes !== undefined ? (
          <>
            <h2>Liked</h2>
            {likes.map((e, i) => {
              return (
                <LikesComp
                  key={i}
                  title={e.Document["title"]}
                  tags={e.Document["tags"]}
                  date={e.Document["createdAt"]}
                  docId={e.docId}
                />
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
}
      <Footer />
    </>
  );
};

export default Profile;
