import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import styles from "./Login.module.css";

import { login } from "../util/http";

const Login = ({ onClose, onClick }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const input = usernameRef.current.value;
    const password = passwordRef.current.value;
    const response = await login(input, password);

    if (response.message === "Login successful!" && response.isActive === "1") {
      dispatch(
        authActions.logIn({
          name: input,
        })
      );
      localStorage.setItem("token", response.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("profile", input);

      onClose();
    } else {
      setError(response.message);
    }
  };
  return (
    <Modal onClose={onClose}>
      <div className={styles.modalContent}>
        <h1>Login</h1>
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
          <Button type="submit">Login to your account</Button>
          {/* <Button type="submit">Register</Button> */}
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.modalLast}>
          <p onClick={onClick}>Forgot Password</p>
          <p>Don't have an account? Sign up now</p>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
