import React, { useEffect, useState, useRef } from "react";
import { app } from "../firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Footer from "./footer/Footer";
import styles from "./Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { URL_BASE } from "../services/constant";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import LoaderPage from "./LoaderPage";

const Login = () => {
  const [userAuth, setUserAuth] = useState(undefined);
  const [showPwdComp, setshowPwdComp] = useState(false);
  const [showLogin, setshowLogin] = useState(true);
  const inputEmailReset = useRef();
  const inputEmlLogin = useRef();
  const inputPwdLogin = useRef();
  const inputNmReg = useRef();
  const inputEmlReg = useRef();
  const inputPwdReg = useRef();
  const [loader, setloader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(app, (user) => {
      if (user) {
        setUserAuth(user);
        navigate("/");
      }else setloader(false)
    });
  }, []);

  const showPwdCompFun = () => {
    setshowPwdComp(!showPwdComp);
  };
  const notify = (event) => toast(event);

  const sendResetEmail = () => {
    setloader(true);
    const resetEmail = inputEmailReset.current.value;
    sendPasswordResetEmail(app, resetEmail)
      .then(() => {
        setloader(false);
        setshowPwdComp(!showPwdComp);
        notify("Password Resest Email sent...");
        // console.log("Password Resest Email sent...");
      })
      .catch((error) => {
        setloader(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        notify(errorMessage);
        // ..
      });
  };
  const LoaderScreen = () => {
    return (
      <div style={{ height: 300 }}>
        <ThreeDots
          height="128"
          width="128"
          radius="9"
          color="rgb(50,150,250)"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    );
  };
  const loginUsingEmPwd = () => {
    setloader(true);
    const lgnEmail = inputEmlLogin.current.value;
    const lgnPwd = inputPwdLogin.current.value;
    // console.log(lgnEmail,lgnPwd);
    signInWithEmailAndPassword(app, lgnEmail, lgnPwd)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        notify(`Welcome back ${user.displayName}!`);
        setUserAuth(user);
        setloader(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(errorMessage)
        setloader(false);
        notify(errorMessage);
      });
  };
  const LoginPanelComp = () => {
    return (
      <div className={styles.compOuter}>
        {loader ? (
          <LoaderScreen />
        ) : (
          <>
            <i style={{ fontSize: 45 }} className="fa fa-user" />
            <h3>Login</h3>
            <input
              ref={inputEmlLogin}
              className={styles.inputCompt}
              placeholder="Email Address"
            />
            <input
              ref={inputPwdLogin}
              className={styles.inputCompt}
              placeholder="Password"
            />
            <button onClick={loginUsingEmPwd} className={styles.loginBtn}>
              Login
            </button>
            <button
              onClick={() => {
                setshowLogin(!showLogin);
              }}
              className={styles.compLinkBtn}
            >
              Register User
            </button>
            {showPwdComp ? (
              <ResetPwdComp />
            ) : (
              <button
                onClick={() => showPwdCompFun()}
                className={styles.compLinkBtn}
              >
                Reset Password
              </button>
            )}
          </>
        )}
      </div>
    );
  };
  const regUsingEmPwd = () => {
    const lgnEmail = inputEmlReg.current.value;
    const lgnPwd = inputPwdReg.current.value;
    const name = inputNmReg.current.value;
    setloader(true);
    axios({
      url: `${URL_BASE}user/registerUser`,
      changeOrigin: true,
      method: "post",
      params: { email: lgnEmail, password: lgnPwd, name: name },
    })
      .then((res) => {
        // setdata(res.data.document);
        setloader(false);
        notify(res.data.message);
      })
      .catch((e) => {
        // console.log(e.response.data.message)
        setloader(false);
        notify(e.response.data.message);
      });
  };
  const RegisterPanelComp = () => {
    return (
      <div className={styles.compOuter}>
        {loader ? (
          <LoaderScreen />
        ) : (
          <>
            <i style={{ fontSize: 45 }} className="fa fa-user" />
            <h3>Register</h3>
            <input
              ref={inputNmReg}
              className={styles.inputCompt}
              placeholder="Name"
            />
            <input
              ref={inputEmlReg}
              className={styles.inputCompt}
              placeholder="Email Address"
            />
            <input
              ref={inputPwdReg}
              className={styles.inputCompt}
              placeholder="Password"
            />
            <button onClick={regUsingEmPwd} className={styles.loginBtn}>
              Register
            </button>

            <button
              onClick={() => {
                setshowLogin(!showLogin);
              }}
              className={styles.compLinkBtn}
            >
              Login User
            </button>
            {showPwdComp ? (
              <ResetPwdComp />
            ) : (
              <button
                onClick={() => showPwdCompFun()}
                className={styles.compLinkBtn}
              >
                Reset Password
              </button>
            )}
          </>
        )}
      </div>
    );
  };
 
  const ResetPwdComp = () => {
    return (
      <div className={styles.compOuterPwd}>
        {loader ? (
          <LoaderScreen />
        ) : (
          <>
            <h3>Password Reset</h3>
            <input
              type="text"
              ref={inputEmailReset}
              className={styles.inputCompt}
              placeholder="Email"
            />
            <button onClick={sendResetEmail} className={styles.loginBtn}>
              Send
            </button>
          </>
        )}
      </div>
    );
  };

  const CompHolder = () => {
    return (
      <div className={styles.compHolder}>
        {showLogin ? <LoginPanelComp /> : <RegisterPanelComp />}
      </div>
    );
  };

  return (
    <>
      {loader ? (
        <LoaderPage />
      ) : (
        <>
          <ToastContainer
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
          <div>
            {userAuth !== undefined ? (
              <h1>{userAuth.uid}</h1>
            ) : (
              <>
                <CompHolder />
              </>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Login;
