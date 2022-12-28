import React, { useState } from "react";
import styles from "./Header.module.css";
import { useNavigate, Link } from "react-router-dom";

const Header = (props) => {
  const [data, setdata] = useState(null);
  const navigate = useNavigate();

  const styleBtn = {
    fontSize: 20,
    fontWeight: 500,
    borderRadius: 15,
    border: "none",
    maxWidth: 350,
    width: "50vw",
    paddingTop: 5,
    paddintBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: "#fff",
    backgroundColor: "rgb(250,150,50)",
  };
  return (
    <>
      <div className={styles.outer}>
        <input
          className={styles.input}
          onChange={(e) => setdata(e.target.value)}
          placeholder="Search"
        />
        <button
          className={styles.search}
          onClick={() => props.props.searchQueryHandler({ data: data })}
        >
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          backgroundColor: "rgb(50,150,250)",
          justifyContent: "center",
          alignItems: "center",
          padding:10
        }}
      >
         <Link to={`/doblogs/${"none"}`}>
        <button style={styleBtn}>
          Create a Post <i className="fa fa-pencil"></i>
        </button>
        </Link>
      </div>
    </>
  );
};

export default Header;
