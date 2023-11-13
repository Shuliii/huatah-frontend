import Modal from "./UI/Modal";
import styles from "./ShowSuccess.module.css";

const ShowSuccess = ({ onClose, data }) => {
  let success = 0;
  let notSuccess = 0;

  data.response.forEach((item) => {
    item.message === "successful" ? success++ : notSuccess++;
  });

  return (
    <Modal onClose={onClose}>
      <div className={styles.modalContent}>
        <div>
          {success} {success === 1 ? "bet is" : "bets are"} successfully placed!
        </div>
        {notSuccess > 0 && (
          <div>
            <span style={{ color: "red" }}>{notSuccess} </span>
            {notSuccess === 1 ? "bet is" : "bets are"} NOT successful!
          </div>
        )}

        <div>Please double check in your profile.</div>
      </div>
    </Modal>
  );
};

export default ShowSuccess;
