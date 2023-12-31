import { useState, memo } from "react";
import { useSelector } from "react-redux";

import Modal from "./UI/Modal";

import styles from "./EachBet.module.css";
import { motion } from "framer-motion";
import { AiOutlinePlusCircle } from "react-icons/ai";

const EachBet = ({ item, onClick, isBetActive }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [hasError, setError] = useState("");

  const plusClickHandler = () => {
    if (!isLoggedIn) {
      setError("Please LogIn before placing any bets!");
      document.body.style.overflow = "hidden";
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
