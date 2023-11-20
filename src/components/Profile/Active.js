import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { deleteBet, queryClient } from "../../util/http";
import styles from "./Active.module.css";

import { AiTwotoneDelete } from "react-icons/ai";

const Active = () => {
  const active = useSelector((state) => state.activeBet.data);
  const [showModal, setShowModal] = useState(false);
  const [betItem, setBetItem] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const staggerVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.05, // Adjust the stagger duration as needed
        when: "beforeChildren", // Ensures that child animations are applied before the parent
      },
    },
  };

  const clickHandler = (item) => {
    setShowModal(true);
    setBetItem(item);
  };

  const closeHandler = () => {
    setShowModal(false);
    setShowMessage(false);
  };

  const deleteHandler = (param) => {
    mutate(param);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deleteBet,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["active"] });
      closeHandler();
      setMessage(data);
      setShowMessage(true);
      // navigate(".");
      // console.log(data);
    },
  });

  const liHelper =
    active !== null && active !== undefined ? (
      active.map((item) => {
        //Potential Winning Helper
        const potential = (+item.Odds - 1) * item.Amount;
        const formattedPotential = potential.toFixed(2);
        return (
          <motion.li
            variants={staggerVariants}
            key={item.ID}
            className={styles.activeItem}
          >
            <div className={styles.matchname}>
              <div style={{ color: "red" }}>{item.Match_Name}</div>
              <div>{item.Amount}</div>
            </div>
            <div>
              <div>
                Bet: <span style={{ color: "red" }}>{item.Bet_Name}</span>
              </div>
              <div>
                Odds: <span style={{ color: "red" }}>{item.Odds}</span>
              </div>
            </div>
            <div>
              Potential Winning:{" "}
              <span style={{ color: "#00FF00" }}>{formattedPotential}</span>
            </div>
            <AiTwotoneDelete
              className={styles.deleteIcon}
              color={"red"}
              onClick={() => clickHandler(item)}
            />
          </motion.li>
        );
      })
    ) : (
      <li>There are no active bets!</li>
    );
  return (
    <>
      <motion.ul
        initial="initial"
        animate="animate"
        variants={staggerVariants}
        className={styles.activeList}
      >
        {liHelper}
      </motion.ul>
      {showModal && (
        <Modal onClose={closeHandler}>
          <div className={styles.modalContent}>
            Are you sure? delete {betItem.Match_Name}
            <div className={styles.buttonContainer}>
              <button
                type="button"
                onClick={closeHandler}
                className={styles.buttonCancel}
              >
                Cancel
              </button>
              {isPending ? (
                <button className={styles.buttonSubmitting} disabled>
                  Deleting...
                </button>
              ) : (
                <Button type="submit" onClick={() => deleteHandler(betItem.ID)}>
                  Submit
                </Button>
              )}
              {/* <Button
                type="submit"
                className={styles.button}
                onClick={() => deleteHandler(betItem.ID)}
              >
                Delete
              </Button> */}
            </div>
          </div>
        </Modal>
      )}

      {showMessage && (
        <Modal onClose={closeHandler}>
          <div className={styles.modalContent}>{message}</div>
        </Modal>
      )}
    </>
  );
};

export default Active;
