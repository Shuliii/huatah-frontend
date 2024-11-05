import { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authActions } from "../store/auth-slice";
import { cartActions } from "../store/cart-slice";
import { activeBetActions } from "../store/activeBet-slice";
import { summaryActions } from "../store/summary-slice";

import Modal from "./UI/Modal";
import { testtoken } from "../util/http";

import styles from "./EachBet.module.css";
import { motion } from "framer-motion";
import { AiOutlinePlusCircle } from "react-icons/ai";

const EachBet = ({ item, onClick, isBetActive }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [hasError, setError] = useState("");
  const dispatch = useDispatch();

  const plusClickHandler = async () => {
    const res = await testtoken();
    console.log(res);

    if (!isLoggedIn) {
      setError("Please LogIn before placing any bets!");
      document.body.style.overflow = "hidden";
      return;
    }

    if (!res) {
      dispatch(cartActions.removeAllCart());
      dispatch(authActions.logOut());
      dispatch(activeBetActions.removeData());
      dispatch(summaryActions.removeData());
      setError("Please relogin!");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      localStorage.removeItem("profile");
      return;
    }

    const data = {
      name: item.name,
      odds: item.odds,
    };
    onClick(data);
  };

  const closeHandler = () => {
    setError("");
    document.body.style.overflow = "unset";
  };

  //odds helper
  const odds = +item.odds;
  const oddsHelper = odds.toFixed(2);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={
          isBetActive ? `${styles.eachBet} + ${styles.active}` : styles.eachBet
        }
        onClick={plusClickHandler}
      >
        <div>{item.name}</div>
        <div>{oddsHelper}</div>
        <AiOutlinePlusCircle size={12} className={styles.plus} color={"red"} />
      </motion.div>
      {hasError && (
        <Modal onClose={closeHandler}>
          <div className={styles.modalContent}>{hasError}</div>
        </Modal>
      )}
    </>
  );
};

export default memo(EachBet);
