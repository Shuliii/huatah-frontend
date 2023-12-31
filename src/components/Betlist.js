import BetItem from "./BetItem";
import { motion } from "framer-motion";
import styles from "./Betlist.module.css";

const BetList = (props) => {
  const variants = {
    initial: {
      y: 70,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const LiHelper = props.data.map((item) => {
    return <BetItem item={item} key={Math.random()} />;
  });
  return (
    <motion.ul
      key={Math.random()}
      initial="initial"
      animate="animate"
      variants={variants}
      className={styles.betlist}
    >
      {LiHelper}
    </motion.ul>
  );
};

export default BetList;
