import BetItem from "./BetItem";

import styles from "./Betlist.module.css";

const BetList = (props) => {
  const LiHelper = props.data.map((item) => {
    // const dateHelper = new Date(item.time);
    return <BetItem item={item} key={Math.random()} />;
  });
  return <ul className={styles.betlist}>{LiHelper}</ul>;
};

export default BetList;
