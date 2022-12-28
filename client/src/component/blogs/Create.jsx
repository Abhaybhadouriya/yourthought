import React, { useEffect, useState, useRef } from "react";
import Footer from "../footer/Footer";
import HeaderBlog from "../header/HeaderBlog";
import {  onAuthStateChanged } from "firebase/auth";
import styles from './Create.module.css'
import { app } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL_BASE } from "../../services/constant";
const Create = () => {
  const [userAuth, setUserAuth] = useState(undefined);
  const inputTags = useRef();
  const inputTitle = useRef();
  const inputContent = useRef();
  const navigate = useNavigate();
  const [content, setContent] = useState(undefined);
  let { id } = useParams();

  useEffect(() => {
   
    onAuthStateChanged(app, (user) => {
      if (user) {
        setUserAuth(user);
        if(id!=="none") getContent()
      }else navigate("/");
    });
  }, []);
  const notify = (event) => toast(event);
   

  const getContent = () =>{
    axios({
      url: `${URL_BASE}documents/viewDocument`,
      changeOrigin: true,
      method: "get",
      params: { docId: id },
    })
      .then((res) => {
        setContent(res.data.doc);
        console.log("DOCS", res.data.doc);
        inputTitle.current.value = res.data.doc.title
        inputContent.current.value = res.data.doc.content
        inputTags.current.value = res.data.doc.tag
      })
      
  }
  const updateData = (e) =>{
    console.log(e)
    axios({
      url: `${URL_BASE}documents/updateDocument`,
      changeOrigin: true,
      method: "post",
      params: {e},
    }).then((res) => {
      notify("Blog Updated Successfully")
      navigate("/");
    });
  }
  const createData = (e) =>{
    axios({
      url: `${URL_BASE}documents/saveDocument`,
      changeOrigin: true,
      method: "post",
      params: {e},
    }).then((res) => {
      notify("Blog Posted Successfully")
      navigate("/");
    });
  }
  const save = () =>{
    if(id==='none') createData({title : inputTitle.current.value,
      content : inputContent.current.value,
      tags : inputTags.current.value,
      userId:userAuth.uid,
      name : userAuth.displayName
    })
    else updateData({title : inputTitle.current.value,
      content : inputContent.current.value,
      tags : inputTags.current.value,
      userId:userAuth.uid,
      name : userAuth.displayName,
      docId:id
    })
    // notify(data)
  }
  return (
    <> <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
      <HeaderBlog />
      {/* {id==='none'?<> */}
      <div className={styles.outer}>
        <h1>Blogs</h1>
        <h3>Write your thoughts here.......</h3>
        <input ref={inputTitle} className={styles.input} type="text" placeholder="Title"/>
        <textarea ref={inputContent} className={styles.textAreaContent} placeholder="content"/>
        <input ref={inputTags} className={styles.textAreaTags} type="text" placeholder="Tags"/>
        <button onClick={save} className={styles.saveBtn}>Save <i className="fa fa-down"/></button>
      </div>
      {/* </>:<>{content?
      <div className={styles.outer}>
        <h1>Blogs</h1>
        <h3>Write your thoughts here.......</h3>
        <input  ref={inputTitle} className={styles.input} type="text" placeholder="Title"/>
        <textarea ref={inputContent} className={styles.textAreaContent} placeholder="content"/>
        <input  ref={inputTags} className={styles.textAreaTags} type="text" placeholder="Tags"/>
        <button onClick={save} className={styles.saveBtn}>Save <i className="fa fa-down"/></button>
      </div>:<></>}
      </>} */}

      <Footer />
    </>
  );
};

export default Create;
