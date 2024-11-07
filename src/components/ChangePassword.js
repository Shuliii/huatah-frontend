import styles from "./Register.module.css";

import { useRef, useState } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";

import { changePassword } from "../util/http";

const ChangePassword = ({ onClose }) => {
  const usernameRef = useRef();
  const newpasswordRef = useRef();
  const newpassword2Ref = useRef();

  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const input = usernameRef.current.value;
    const newpassword = newpasswordRef.current.value;
    const newpassword2 = newpassword2Ref.current.value;

    if (newpassword !== newpassword2) {
      setError("Passord Mismatch");
    } else {
      const response = await changePassword(input, newpassword);
      if (response.message === "successful") {
        setSuccessful("Password Change Successful!");
        setTimeout(onClose, 1000);
      }
      if (response.message === "Username not found") {
        setError("Username not found!");
      }

      if (response.message === "fail") {
        setError("Password Change Failed!");
      }
    }
  };
  return (
    <Modal onClose={onClose}>
      <div
        className={`${styles.modalContent} ${successful && styles.backdrop}`}
      >
        <h1>Change Password</h1>
        <form onSubmit={submitHandler}>
          <input
            required
            name="name"
            type="text"
            placeholder="Username"
            autoComplete="off"
            ref={usernameRef}
          ></input>
          <input
            required
            name="newpassword"
            type="password"
            placeholder="New Password"
            autoComplete="off"
            ref={newpasswordRef}
          ></input>
          <input
            required
            name="newpassword2"
            type="password"
            placeholder="Re-type Password"
            autoComplete="off"
            ref={newpassword2Ref}
          ></input>
          <Button type="submit">Change Password</Button>
          {/* <Button type="submit">Register</Button> */}
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {/* <div className={styles.modalLast}>
          <p>Forgot Password</p>
          <p>Don't have an account? Sign up now</p>
        </div> */}
      </div>
      {successful && (
        <Modal onClose={onClose}>
          <div className={styles.modalContent}>{successful}</div>
        </Modal>
      )}
    </Modal>
  );
};

export default ChangePassword;
