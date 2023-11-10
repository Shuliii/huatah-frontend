import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import { authActions } from "../store/auth-slice";

import Button from "./UI/Button";
import Modal from "./UI/Modal";

import styles from "./Header.module.css";
import { PiShoppingCartSimple } from "react-icons/pi";
import logo from "../assets/logo_white.png";

const Header = () => {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  const cart = useSelector((state) => state.cart.cart);
  const [showLogIn, setshowLogIn] = useState(false);
  const [error, setError] = useState("");

  console.log(cart);

  const loginHandler = () => {
    setshowLogIn(true);
  };
  const closeHandler = () => {
    setshowLogIn(false);
  };

  const logoutHandler = () => {
    dispatch(authActions.logOut());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("profile");
  };

  const getUser = async (param) => {
    const response = await fetch(
      `https://test-express-5gi8.onrender.com/user/${param}`
    );
    const resData = await response.json();
    return resData;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const input = usernameRef.current.value;
    const response = await getUser(input);

    if (
      response.message === "successful" &&
      response.data[0].isActive === "true"
    ) {
      dispatch(authActions.logIn({ name: input }));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("profile", input);
      setshowLogIn(false);
    }

    if (
      response.message === "successful" &&
      response.data[0].isActive === "false"
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
        <div className={styles.loggedIn}>
          <div className={styles.cart}>
            <PiShoppingCartSimple size={32} />
            <div>{cart.length}</div>
          </div>

          <span>{profile}</span>
          <Button type="button" onClick={logoutHandler}>
            Logout
          </Button>
        </div>
      )}

      <AnimatePresence>
        {showLogIn && (
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
              {error && <p className={styles.error}>{error}</p>}
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
