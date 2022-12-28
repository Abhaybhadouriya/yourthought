import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import styles from "./Header.module.css"
import { app } from '../../firebase';
import {  signOut,onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const HeaderBlog = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const logout = () =>{
    signOut(app).then(() => {
      navigate(`/login`);
    }).catch((error) => {
      console.log(error)
    });
  }
  useEffect(() => {
    onAuthStateChanged(app, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    });

    // eslint-disable-next-line
  }, []);
  return (
    <div className={styles.outerBlog}>
    <span onClick={()=>{ navigate("/")}} className={styles.spanBlog} >Blog Reader</span>
    <button onClick={logout} className={styles.buttonLogout}>Logout <i className='fa fa-sign-out'/></button>
    {user?
    <Link to={`/profile/${user.uid}`}><button className={styles.buttonBlog} >Profile <i className="fa fa-user" aria-hidden="true"/></button></Link>
    :<></>}
    </div>
  )
}
export default HeaderBlog