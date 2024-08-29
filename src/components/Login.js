import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import styles from "./Login.module.css";

const Login = ({ onClose }) => {
  const usernameRef = useRef();
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
    const response = await getUser(input);

    if (
      response.message === "successful" &&
      response.data[0].isActive === "True"
    ) {
      dispatch(
        authActions.logIn({
          name: input,
          isAdmin: response.data[0].isAdmin === "True",
        })
      );
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("profile", input);

      onClose();
    } else if (
      response.message === "successful" &&
      response.data[0].isActive === "False"
    ) {
      setError("Please contact admin to activate the account!");
    } else {
      setError("Username does not exist, please create Username");
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
          <Button type="submit">Login to your account</Button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.modalLast}>
          <p>Don't have an account?</p>
          <p>Please contact admin!</p>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
