import styles from "./Register.module.css";

import { useRef, useState } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";

import { register } from "../util/http";

const Register = ({ onClose }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [successful, setSuccessful] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const input = usernameRef.current.value;
    const password = passwordRef.current.value;
    const response = await register(input, password);
    console.log(response);

    if (response.message === "successful") {
      setSuccessful("Registration complete!");
      setTimeout(onClose, 1000);
    }
    if (response.message === "fail") {
      setError("Username has already taken");
    }
  };
  return (
    <Modal onClose={onClose}>
      <div
        className={`${styles.modalContent} ${successful && styles.backdrop}`}
      >
        <h1>Register</h1>
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
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
            ref={passwordRef}
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

export default Register;
