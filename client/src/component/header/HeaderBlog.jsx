import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Header.module.css"
const HeaderBlog = () => {
  return (
    <div className={styles.outerBlog}>
    <span className={styles.spanBlog} >Blog Reader</span>
    <Link to="/profile"><button className={styles.buttonBlog} >Profile <i className="fa fa-user" aria-hidden="true"/></button></Link>
    </div>
  )
}
export default HeaderBlog