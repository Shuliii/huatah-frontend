import styles from "./Betlist.module.css";

const BetList = (props) => {
  const LiHelper = props.data.map((item) => {
    const dateHelper = new Date(item.time);
    return (
      <li className={styles.listitem}>
        <div className={styles.matchname}>
          <div>{item.match_name}</div>
          <div>date</div>
        </div>
        <div className={styles.seemore}>
          <span>See more</span>
        </div>
      </li>
    );
  });
  return <ul className={styles.betlist}>{LiHelper}</ul>;
};

export default BetList;
