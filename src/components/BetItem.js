import { useState } from "react";

import styles from "./BetItem.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";

const BetItem = ({ item }) => {
  const [isExpand, setIsExpand] = useState(false);

  const seeMoreHandler = () => {
    setIsExpand((prev) => {
      return !prev;
    });
  };
  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.listitem}
    >
      <div className={styles.matchname}>
        <div>{item.match_name}</div>
        <div>date</div>
      </div>
      <div className={styles.betlistmain}>
        {item.main_bet_list.map((item) => {
          return (
            <div key={Math.random()} className={styles.eachBet}>
              <div>{item.name}</div>
              <div>{item.odds}</div>
              <AiOutlinePlusCircle
                size={12}
                className={styles.plus}
                color={"red"}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.seemore}>
        <span onClick={seeMoreHandler}>
          See {isExpand ? "less" : "more"}
          {/* <span className={styles.triangleIcon}>
            <GoTriangleUp />
          </span> */}
        </span>
      </div>
      <AnimatePresence>
        {isExpand && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.betlistmore}
          >
            {item.more_bet_list.map((item) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: -80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  key={Math.random()}
                  className={styles.eachBet}
                >
                  <div>{item.name}</div>
                  <div>{item.odds}</div>
                  <AiFillPlusCircle
                    size={12}
                    className={styles.plus}
                    color={"red"}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default BetItem;
