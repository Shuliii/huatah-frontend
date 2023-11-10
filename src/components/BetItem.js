import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

import EachBet from "./EachBet";

import styles from "./BetItem.module.css";
import { motion, AnimatePresence } from "framer-motion";

const BetItem = ({ item }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const [isExpand, setIsExpand] = useState(false);
  //   const [addedToCartMap, setAddedToCartMap] = useState({});

  const seeMoreHandler = () => {
    setIsExpand((prev) => !prev);
  };

  //   const addedToCartHandler = (betName) => {
  //     setAddedToCartMap((prev) => {
  //       return { ...prev, [betName]: !prev[betName] };
  //     });
  //   };

  const clickHandler = (data) => {
    const toBeDispatch = {
      Username: profile,
      Match_Name: item.match_name,
      Bet_Name: data.name,
      Odds: data.odds,
    };
    dispatch(cartActions.addToCart({ item: toBeDispatch }));
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
          return <EachBet item={item} key={item.name} onClick={clickHandler} />;
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
                <EachBet item={item} key={item.name} onClick={clickHandler} />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default BetItem;
