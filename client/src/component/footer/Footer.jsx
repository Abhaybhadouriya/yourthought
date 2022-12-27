import React from "react";
import styles from "./Footer.module.css"
const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>
        Your Thought by{" "}
        <a className={styles.footerCredit}
          href="https://www.abhaybhadouriya.tech"
          rel="noreferrer"
          target="_blank"
        >
          Abhay Bhadouriya
        </a>{" "}
        <br /> All Copyright Reserved 2022
      </p>
    </div>
  );
};

export default Footer;
