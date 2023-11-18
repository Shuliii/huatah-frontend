import styles from "./Active.module.css";
import { useSelector } from "react-redux";

const Active = () => {
  const active = useSelector((state) => state.activeBet.data);
  console.log(active);

  const liHelper =
    active !== null ? (
      active.map((item) => {
        //Potential Winning Helper
        const potential = (+item.Odds - 1) * item.Amount;
        const formattedPotential = potential.toFixed(2);
        return (
          <li key={item.ID} className={styles.activeItem}>
            <div className={styles.matchname}>
              <div style={{ color: "red" }}>{item.Match_Name}</div>
              <div>{item.Amount}</div>
            </div>
            <div>
              <div>
                Bet: <span style={{ color: "red" }}>{item.Bet_Name}</span>
              </div>
              <div>
                Odds: <span style={{ color: "red" }}>{item.Odds}</span>
              </div>
            </div>
            <div>
              Potential Winning:
              <span style={{ color: "#00FF00" }}>{formattedPotential}</span>
            </div>
          </li>
        );
      })
    ) : (
      <li>There are no active bets!</li>
    );
  return <ul className={styles.activeList}>{liHelper}</ul>;
};

export default Active;
