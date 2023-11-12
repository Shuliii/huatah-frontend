import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import styles from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  const portalElement = document.getElementById("overlays");
  const closeHandler = (event) => {
    event.stopPropagation();
    onClose();
  };
  return (
    <>
      {createPortal(
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
        />,
        portalElement
      )}
      {createPortal(
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
            type: "spring",
            duration: 0.5,
          }}
          open
          className={styles.modal}
        >
          {children}
        </motion.div>,
        portalElement
      )}
    </>
  );
};

export default Modal;
