import { useState, memo } from "react";
import { useSelector } from "react-redux";

import Modal from "./UI/Modal";

import styles from "./EachBet.module.css";
import { motion } from "framer-motion";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

const EachBet = ({ item, onClick }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [addedToCart, setAddedToCart] = useState(false);
  const [hasError, setError] = useState("");

  const plusClickHandler = () => {
    if (!isLoggedIn) {
      setError("Please LogIn before placing any bets!");
      return;
    }
    const data = {
      name: item.name,
      odds: item.odds,
      sign: "plus",
    };
    onClick(data);
    setAddedToCart(true);
  };

  const minusClickHandler = () => {
    // Implement logic for removing the bet if needed
    setAddedToCart(false);
  };

  const closeHandler = () => {
    setError("");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className={styles.eachBet}
      >
        <div>{item.name}</div>
        <div>{item.odds}</div>
        {!addedToCart && (
          <AiOutlinePlusCircle
            size={12}
            className={styles.plus}
            color={"red"}
            onClick={plusClickHandler}
          />
        )}
        {addedToCart && (
          <AiOutlineMinusCircle
            size={12}
            className={styles.minus}
            color={"red"}
            onClick={minusClickHandler}
          />
        )}
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
