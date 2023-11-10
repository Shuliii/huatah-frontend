import { useState } from "react";

import AddToCartButton from "./UI/AddToCartButton";

import styles from "./BetItem.module.css";
import { GoTriangleUp } from "react-icons/go";
import { AiFillPlusCircle } from "react-icons/ai";

const BetItem = ({ item }) => {
  const [isExpand, setIsExpand] = useState(false);

  const seeMoreHandler = () => {
    setIsExpand((prev) => {
      return !prev;
    });
  };
  return (
    <li className={styles.listitem}>
      <div className={styles.matchname}>
        <div>{item.match_name}</div>
        <div>date</div>
      </div>
      <div className={styles.betlistmain}>
        {item.main_bet_list.map((item) => {
          return (
            <div className={styles.eachBet}>
              <div>{item.name}</div>
              <div>{item.odds}</div>
              <AiFillPlusCircle size={12} className={styles.plus} />
            </div>
          );
        })}
      </div>
      <div className={styles.seemore}>
        <span onClick={seeMoreHandler}>
          See more
          {/* <span className={styles.triangleIcon}>
            <GoTriangleUp />
          </span> */}
        </span>
      </div>
      {isExpand && (
        <div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
        </div>
      )}
    </li>
  );
};

export default BetItem;
