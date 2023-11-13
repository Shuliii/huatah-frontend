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
  const active = useSelector((state) => state.activeBet.data);
  const [isExpand, setIsExpand] = useState(false);
  let isMatchActive = false;
  console.log(active);

  //style for LI border
  const cartMatchName = cart.map((item) => item.Match_Name);
  const activeMatchName =
    active !== undefined ? active.map((item) => item.Match_Name) : [];
  cartMatchName.forEach((element) => {
    if (item.match_name === element) {
      isMatchActive = true;
    }
  });
  activeMatchName.forEach((element) => {
    if (item.match_name === element) {
      isMatchActive = true;
    }
  });

  //style for Each Bet Border (being rendered in jsx)
  const cartBetName = cart
    .filter((el) => el.Match_Name === item.match_name)
    .map((item) => item.Bet_Name);

  const activeBetName =
    active !== undefined
      ? active
          .filter((el) => el.Match_Name === item.match_name)
          .map((item) => item.Bet_Name)
      : [];

  //see more handler
  const seeMoreHandler = () => {
    setIsExpand((prev) => !prev);
  };

  const eachBetClickHandler = (data) => {
    const toBeDispatch = {
      Helper_ID: `${item.match_name} && ${data.name}`,
      Username: profile,
      Type: item.type,
      Match_Name: item.match_name,
      Bet_Name: data.name,
      Odds: data.odds,
    };
    dispatch(cartActions.toggleToCart({ item: toBeDispatch }));
  };

  //mainbet Helper
  const mainBetHelper = item.main_bet_list.map((item) => {
    let isBetActive = false;
    cartBetName.forEach((element) => {
      if (item.name === element) {
        isBetActive = true;
      }
    });
    activeBetName.forEach((element) => {
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
  });

  //morebet Helper
  const moreBetHelper = item.more_bet_list.map((item) => {
    let isBetActive = false;
    cartBetName.forEach((element) => {
      if (item.name === element) {
        isBetActive = true;
      }
    });
    activeBetName.forEach((element) => {
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
  });

  //date time helper
  const matchDateTime = new Date(item.time);
  const day = matchDateTime.toLocaleString("en-US", {
    weekday: "short",
  });
  const date = matchDateTime.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
  });
  const options = {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };
  const time = matchDateTime.toLocaleString("en-US", options);

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
        <div className={styles.dateContainer}>
          <div>{`${day},${date}`}</div>
          <div>{time}</div>
        </div>
      </div>
      <div className={styles.betlistmain}>{mainBetHelper}</div>
      <div className={styles.seemore}>
        <span onClick={seeMoreHandler}>See {isExpand ? "less" : "more"}</span>
      </div>
      <AnimatePresence>
        {isExpand && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={styles.betlistmore}
          >
            {moreBetHelper}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

export default BetItem;
