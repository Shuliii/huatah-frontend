import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import styles from "./Login.module.css";

import { login } from "../util/http";

const Login = ({ onClose }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const getUser = async (param) => {
    try {
      const response = await fetch(`https://www.huatah.co/user/${param}`);
      const jsonData = await response.json(); // Parse response as JSON
      return jsonData;
    } catch (error) {
      return { message: "Error", data: [] };
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const input = usernameRef.current.value;
    const password = passwordRef.current.value;
    const response = await login(input, password);
    console.log(response);

    if (response.message === "Login successful!" && response.isActive === "1") {
      console.log("this");
      dispatch(
        authActions.logIn({
          name: input,
        })
      );
      localStorage.setItem("token", response.token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("profile", input);

      onClose();
    }
    // else if (
    //   response.message === "Login successful!" &&
    //   response.isActive !== "1"
    // ) {
    //   setError(response.message);
    // }
    else {
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
          <p>Forgot Password</p>
          <p>Don't have an account? Sign up now</p>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
