import { motion } from "framer-motion";
import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        transition: { type: "spring", duration: 0.5 },
        backgroundColor: "rgb(255,255,255)",
        border: "2px solid red",
        color: "rgb(0,0,0)",
      }}
      whileTap={{
        scale: 0.9,
        transition: { duration: 0.5 },
      }}
      type={props.type}
      onClick={props.onClick}
      className={styles.button}
      disabled={props.isDisabled}
    >
      {props.children}
    </motion.button>
  );
};

export default Button;
