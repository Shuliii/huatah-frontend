import { motion } from "framer-motion";
import styles from "./AddToCartButton.module.css";
import { AiOutlinePlus } from "react-icons/ai";

const Button = (props) => {
  const clickHandler = () => {
    console.log("clicked");
  };
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
      onClick={clickHandler}
      className={styles.button}
    >
      <AiOutlinePlus />
    </motion.button>
  );
};

export default Button;
