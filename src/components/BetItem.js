import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";

import EachBet from "./EachBet";

import styles from "./BetItem.module.css";
import { motion, AnimatePresence } from "framer-motion";

const BetItem = ({ item }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const cart = useSelector((state) => state.cart.cart);
  const [isExpand, setIsExpand] = useState(false);
  let isMatchActive = false;
  console.log(cart);

  //style for LI border
  const cartMatchName = cart.map((item) => item.Match_Name);
  cartMatchName.forEach((element) => {
    if (item.match_name === element) {
      isMatchActive = true;
    }
  });

  const cartBetName = cart
    .filter((el) => el.Match_Name === item.match_name)
    .map((item) => item.Bet_Name);

  const seeMoreHandler = () => {
    setIsExpand((prev) => !prev);
  };

  const eachBetClickHandler = (data) => {
    const toBeDispatch = {
      Helper_ID: `${item.match_name} && ${data.name}`,
      Username: profile,
      Match_Name: item.match_name,
      Bet_Name: data.name,
      Odds: data.odds,
    };
    dispatch(cartActions.toggleToCart({ item: toBeDispatch }));
  };
  return (
    <motion.li
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className={
        isMatchActive
          ? `${styles.listitem} + ${styles.active}`
          : styles.listitem
      }
    >
      <div className={styles.matchname}>
        <div>{item.match_name}</div>
        <div>date</div>
      </div>
      <div className={styles.betlistmain}>
        {item.main_bet_list.map((item) => {
          let isBetActive = false;
          cartBetName.forEach((element) => {
            if (item.name === element) {
              isBetActive = true;
            }
          });
          return (
            <EachBet
              item={item}
              key={item.name}
              onClick={eachBetClickHandler}
              isBetActive={isBetActive}
            />
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
              let isBetActive = false;
              cartBetName.forEach((element) => {
                if (item.name === element) {
                  isBetActive = true;
                }
              });
              return (
                <EachBet
                  item={item}
                  key={item.name}
                  onClick={eachBetClickHandler}
                  isBetActive={isBetActive}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default BetItem;
