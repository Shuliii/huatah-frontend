import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { deleteBet, queryClient } from "../../util/http";
import styles from "./Active.module.css";

import { AiTwotoneDelete } from "react-icons/ai";

const Active = () => {
  const navigate = useNavigate();
  const active = useSelector((state) => state.activeBet.data);
  const [showModal, setShowModal] = useState(false);
  const [betItem, setBetItem] = useState(null);

  const clickHandler = (item) => {
    setShowModal(true);
    setBetItem(item);
  };

  const closeHandler = () => {
    setShowModal(false);
  };

  const deleteHandler = (param) => {
    mutate(param);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deleteBet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["active"] });
      closeHandler();
      navigate(".");
    },
  });

  const liHelper =
    active !== null && active !== undefined ? (
      active.map((item) => {
        //Potential Winning Helper
        const potential = (+item.Odds - 1) * item.Amount;
        const formattedPotential = potential.toFixed(2);
        return (
          <li key={item.ID} className={styles.activeItem}>
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
          </li>
        );
      })
    ) : (
      <li>There are no active bets!</li>
    );
  return (
    <>
      <ul className={styles.activeList}>{liHelper}</ul>
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
    </>
  );
};

export default Active;
