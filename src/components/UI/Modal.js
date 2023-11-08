import { motion } from "framer-motion";
import styles from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  const closeHandler = () => {
    onClose();
  };
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className={styles.backdrop}
        onClick={closeHandler}
      />
      <motion.dialog
        initial={{
          y: 50,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        exit={{
          y: 50,
          opacity: 0,
        }}
        transition={{
          type: "spring",
          duration: 0.5,
        }}
        open
        className={styles.modal}
      >
        {children}
      </motion.dialog>
    </>
  );
};

export default Modal;
