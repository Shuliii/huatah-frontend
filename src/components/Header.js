import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import { authActions } from "../store/auth-slice";

import Button from "./UI/Button";
import Modal from "./UI/Modal";

import styles from "./Header.module.css";
import { PiShoppingCartSimple } from "react-icons/pi";
import logo from "../assets/logo_red.png";

const Header = () => {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const loginHandler = () => {
    setShowModal(true);
  };
  const closeHandler = () => {
    setShowModal(false);
  };

  const getUser = async (param) => {
    const response = await fetch(
      `https://test-express-5gi8.onrender.com/user/${param}`
    );
    const resData = await response.json();
    console.log(resData);
    return resData;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const response = getUser(usernameRef.current.value);
    console.log(response);

    if (
      response.message === "successful" &&
      response.data.isActive === "true"
    ) {
      dispatch(authActions.logIn({ name: usernameRef.current.value }));
      setShowModal(false);
    }

    if (
      response.message === "successful" &&
      response.data.isActive === "false"
    ) {
      setError("Please contact admin to activate the account!");
    }

    if (response.message !== "successful") {
      setError("Username does not exist, please create Username");
    }
  };

  return (
    <header>
      <img src={logo} alt="huatah-logo" className={styles.logo} />
      {!isLoggedIn && (
        <Button type="button" onClick={loginHandler}>
          Login
        </Button>
      )}
      {isLoggedIn && (
        <div>
          <PiShoppingCartSimple />
          <span>1</span>
          <p>{profile}</p>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <Modal onClose={closeHandler}>
            <div className={styles.modalContent}>
              <h1>Login</h1>
              <form onSubmit={submitHandler}>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Username"
                  ref={usernameRef}
                ></input>
                <Button type="submit">Login to your account</Button>
              </form>
              <p>{error}</p>
              <div className={styles.modalLast}>
                <p>Don't have an account?</p>
                <p>Please contact admin!</p>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
