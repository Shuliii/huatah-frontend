import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { authActions } from "../store/auth-slice";
import { cartActions } from "../store/cart-slice";
import { activeBetActions } from "../store/activeBet-slice";
import { summaryActions } from "../store/summary-slice";

import Button from "./UI/Button";
import Login from "./Login";
import Register from "./Register";
import ChangePassword from "./ChangePassword";
import Cart from "./Cart";
import ShowSuccess from "./ShowSuccess";

import styles from "./Header.module.css";
import { PiShoppingCartSimple } from "react-icons/pi";
import logo from "../assets/logo_white.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const profile = useSelector((state) => state.auth.profile);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const cart = useSelector((state) => state.cart.cart);
  const balance = useSelector((state) => state.summary.balance);

  const [showLogIn, setshowLogIn] = useState(false);
  const [showRegister, setshowRegister] = useState(false);
  const [showChangePassword, setshowChangePassword] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successModalData, setSuccessModalData] = useState([]);
  const [hoverState, setHoverState] = useState(false);

  const loginHandler = () => {
    document.body.style.overflow = "hidden";
    setshowLogIn(true);
  };

  const registerHandler = () => {
    document.body.style.overflow = "hidden";
    setshowRegister(true);
  };

  const changePasswordHandler = () => {
    document.body.style.overflow = "hidden";
    setshowLogIn(false);
    setshowChangePassword(true);
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
    setshowRegister(false);
    setshowChangePassword(false);
  };

  const logoutHandler = () => {
    dispatch(cartActions.removeAllCart());
    dispatch(authActions.logOut());
    dispatch(activeBetActions.removeData());
    dispatch(summaryActions.removeData());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    navigate("/");
  };

  const submitHandler = (data) => {
    dispatch(cartActions.removeAllCart());
    closeHandler();
    document.body.style.overflow = "hidden";
    setSuccessModalData(data);
    setShowSuccess(true);
  };

  //balance Helper
  const formattedBalance = balance ? balance.toFixed(2) : "0.00";

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="huatah-logo" className={styles.logo} />
      </Link>

      {!isLoggedIn && (
        <div className={styles.buttonContainer}>
          <Button type="button" onClick={loginHandler}>
            Login
          </Button>
          <Button type="button" onClick={registerHandler}>
            Register
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

            <AnimatePresence>
              {hoverState && (
                <motion.ul
                  animate={{ opacity: [0, 1], y: [-20, 0] }}
                  exit={{ opacity: 0, y: -20 }}
                  className={styles.profileul}
                >
                  <li>
                    <Link to={`/profile/${profile}`}>View Profile</Link>
                  </li>
                  {isAdmin && <li>Admin Page</li>}
                  <li onClick={logoutHandler}>Logout</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showLogIn && (
          <Login onClick={changePasswordHandler} onClose={closeHandler} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChangePassword && <ChangePassword onClose={closeHandler} />}
      </AnimatePresence>

      <AnimatePresence>
        {showRegister && <Register onClose={closeHandler} />}
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
