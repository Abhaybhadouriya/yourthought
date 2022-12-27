import React from "react";
import styles from "./BlogTile.module.css";
import { Outlet, Link } from "react-router-dom";

const BlogTile = (props) => {
  return (
    <div className={styles.outer}>
      <div className={styles.titleDiv}>
        <span className={styles.title}>{props.title}</span>
      </div>

      <div className={styles.tagsDiv}>
        <span className={styles.tags}>tags :- {props.tags}</span>
      </div>

      <div className={styles.dateDiv}>
        <span className={styles.date}>
          Posted On : {props.date.substr(0, 10)}
        </span>
      </div>

      <div className={styles.lowerDiv}>
        <span className={styles.name}>by :- {props.name}</span>
        <Link to={`/blogs/${props.id}`}>
          <button className={styles.button}>
            View <i className="fa fa-eye" aria-hidden="true" />
          </button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default BlogTile;
