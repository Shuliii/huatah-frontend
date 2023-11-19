import { createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import { postBet, queryClient } from "../util/http";
import { cartActions } from "../store/cart-slice";

import Modal from "./UI/Modal";
import Button from "./UI/Button";

import styles from "./Cart.module.css";

const Cart = ({ onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  //to get each input value
  let refArr = [];
  const addValueHandler = (item, i) => {
    const newData = {
      ...item,
      Amount: refArr[i].current.value,
    };
    dispatch(cartActions.addAmount({ item: newData }));
  };

  const liHelper = cart.map((item, i) => {
    const ref = createRef();
    refArr.push(ref);
    return (
      <div key={item.Helper_ID} className={styles.postBetContainer}>
        <div className={styles.betInfo}>
          <div>{item.Match_Name}</div>
          <div>{item.Bet_Name}</div>
          <div>Odds: {item.Odds}</div>
        </div>
        <div className={styles.lastForm}>
          <input
            name="name"
            autoComplete="off"
            type="number"
            min="0"
            required
            value={item.Amount || ""}
            ref={refArr[i]}
            onChange={() => addValueHandler(item, i)}
          ></input>
        </div>
      </div>
    );
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postBet,
    onSuccess: (data) => {
      onSubmit(data);
      queryClient.invalidateQueries({ queryKey: ["active"] });
    },
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    //check if all refs have value
    if (
      refArr.some(
        (item) =>
          item.current.value === null ||
          item.current.value === "" ||
          item.current.value === undefined
      )
    ) {
      return; // This will exit the function when any condition is met.
    }

    mutate(cart);
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalContent}>
        {cart.length > 0 && (
          <form onSubmit={submitHandler}>
            {liHelper}
            <div className={styles.buttonContainer}>
              <button
                type="button"
                onClick={onClose}
                className={styles.buttonCancel}
              >
                Cancel
              </button>
              {isPending ? (
                <button className={styles.buttonSubmitting} disabled>
                  Submitting...
                </button>
              ) : (
                <Button type="submit" className={styles.button}>
                  Submit
                </Button>
              )}
            </div>
          </form>
        )}
        {cart.length === 0 && <div>No Items in the cart!</div>}
      </div>
    </Modal>
  );
};

export default Cart;
