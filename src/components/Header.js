import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

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
  const balance = useSelector((state) => state.summary.balance);
  const [showLogIn, setshowLogIn] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successModalData, setSuccessModalData] = useState([]);
  const [hoverState, setHoverState] = useState(false);

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
    try {
      //https://test-express-5gi8.onrender.com
      //http://localhost:3030/postbet
      const res = await fetch(
        "https://test-express-5gi8.onrender.com/postbet",
        {
          method: "POST",
          body: JSON.stringify(cart),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        console.log("There is an error!");
      } else {
        const resText = await res.text();
        const resData = resText ? JSON.parse(resText) : null;
        setSuccessModalData(resData);

        dispatch(cartActions.removeAllCart());
        closeHandler();
        document.body.style.overflow = "hidden";
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //balance Helper
  const balanceHelper = balance && balance[0].balance;
  const formattedBalance = balanceHelper && balanceHelper.toFixed(2);

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="huatah-logo" className={styles.logo} />
      </Link>

      {!isLoggedIn && (
        <div>
          <Button type="button" onClick={loginHandler}>
            Login
          </Button>
        </div>
      )}
      {isLoggedIn && (
        <div className={styles.loggedIn}>
          <motion.div
            animate={{ scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 0.3 }}
            key={cart}
            className={styles.cart}
            onClick={cartHandler}
          >
            <PiShoppingCartSimple size={32} color={"white"} />
            <div>{cart.length}</div>
          </motion.div>

          <div
            className={styles.profile}
            onClick={() => setHoverState((prev) => !prev)}
          >
            <div>
              <div>{profile}</div>
              {formattedBalance && <div>{formattedBalance}</div>}
            </div>

            {hoverState && (
              <ul className={styles.profileul}>
                <li>
                  <Link to={`/profile/${profile}`}>View Profile</Link>
                </li>
                <li onClick={logoutHandler}>Logout</li>
              </ul>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showLogIn && <Login onClose={closeHandler} />}
      </AnimatePresence>

      <AnimatePresence>
        {showCart && <Cart onClose={closeHandler} onSubmit={submitHandler} />}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <ShowSuccess onClose={closeHandler} data={successModalData} />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
