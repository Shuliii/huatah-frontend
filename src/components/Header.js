import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { authActions } from "../store/auth-slice";
import { cartActions } from "../store/cart-slice";

import Button from "./UI/Button";
import Login from "./Login";
import Cart from "./Cart";
import ShowSuccess from "./ShowSuccess";

import styles from "./Header.module.css";
import { PiShoppingCartSimple } from "react-icons/pi";
import logo from "../assets/logo_white.png";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  const cart = useSelector((state) => state.cart.cart);
  const [showLogIn, setshowLogIn] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const loginHandler = () => {
    document.body.style.overflow = "hidden";
    setshowLogIn(true);
  };

  const cartHandler = () => {
    document.body.style.overflow = "hidden";
    setShowCart(true);
  };

  const closeHandler = () => {
    document.body.style.overflow = "unset";
    setshowLogIn(false);
    setShowCart(false);
    setShowSuccess(false);
  };

  const logoutHandler = () => {
    dispatch(cartActions.removeAllCart());
    dispatch(authActions.logOut());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("profile");
  };

  const submitHandler = async (e) => {
    const res = await fetch("http://localhost:3030/postbet", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.log("There is an error!");
    }
    const resData = await res.json();

    if (resData.message === "successful") {
      dispatch(cartActions.removeAllCart());
      closeHandler();
      document.body.style.overflow = "hidden";
      setShowSuccess(true);
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
          <div className={styles.cart} onClick={cartHandler}>
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
        {showLogIn && <Login onClose={closeHandler} />}
      </AnimatePresence>

      <AnimatePresence>
        {showCart && <Cart onClose={closeHandler} onSubmit={submitHandler} />}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && <ShowSuccess onClose={closeHandler} />}
      </AnimatePresence>
    </header>
  );
};

export default Header;
