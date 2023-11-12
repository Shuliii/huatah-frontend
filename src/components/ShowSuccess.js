import Modal from "./UI/Modal";
import styles from "./ShowSuccess.module.css";

const ShowSuccess = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.modalContent}>
        <div>Successfully placed the bets!</div>
        <div>Please double check in your profile.</div>
      </div>
    </Modal>
  );
};

export default ShowSuccess;
