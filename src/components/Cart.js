import { useSelector, useDispatch } from "react-redux";
import Modal from "./UI/Modal";
import Button from "./UI/Button";

import styles from "./Cart.module.css";

const Cart = ({ onClose }) => {
  const cart = useSelector((state) => state.cart.cart);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  const liHelper = cart.map((item) => (
    <li>
      <div className={styles.betInfo}>
        <div>{item.Match_Name}</div>
        <div>{item.Bet_Name}</div>
        <div>Odds: {item.Odds}</div>
      </div>
      <form onSubmit={submitHandler}>
        <input type="number" min="0" required />
      </form>
    </li>
  ));
  return (
    <Modal onClose={onClose}>
      <div className={styles.modalContent}>
        {cart.length > 0 && <ul>{liHelper}</ul>}
        {cart.length === 0 && <div>No Items in the cart!</div>}

        <div className={styles.buttonContainer}>
          <button
            type="button"
            onClick={onClose}
            className={styles.buttonCancel}
          >
            Cancel
          </button>
          {cart.length > 0 && <Button>Submit</Button>}
        </div>
      </div>
    </Modal>
  );
};

export default Cart;
