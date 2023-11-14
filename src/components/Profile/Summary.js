import { useSelector } from "react-redux";

import { motion } from "framer-motion";
import styles from "./Summary.module.css";

const Summary = () => {
  const summary = useSelector((state) => state.summary.data);

  const staggerVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05, // Adjust the stagger duration as needed
      },
    },
  };

  const trHelper =
    summary &&
    summary.map((item) => (
      <motion.tr
        variants={staggerVariants}
        key={item.ID}
        className={item.Bet_Result === "W" ? styles.win : styles.lose}
      >
        <td>{item.Match_Name}</td>
        <td>{item.Bet_Name}</td>
        <td>{item.Amount}</td>
        <td>{item.Odds}</td>
        <td>{item.Bet_Result}</td>
        <td>{item.Balance.toFixed(2)}</td>
      </motion.tr>
    ));
  return (
    <div className={styles.tableContainer}>
      {/* <motion.table animate={{ opacity: [0, 0.5, 1] }}> */}
      {summary && (
        <motion.table
          initial="initial"
          animate="animate"
          variants={staggerVariants}
        >
          <thead>
            <tr>
              <th>Match Name</th>
              <th>Bet Name</th>
              <th>Bet Amount</th>
              <th>Odds</th>
              <th>Bet Result</th>
              <th>Result</th>
            </tr>
          </thead>
          <motion.tbody>{trHelper}</motion.tbody>
        </motion.table>
      )}
      {!summary && <div>There are no past bets!</div>}
    </div>
  );
};

export default Summary;
