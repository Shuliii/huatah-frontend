import { NavLink } from "react-router-dom";

import styles from "./ProfileNavigation.module.css";

const ProfileNavigation = () => {
  return (
    <ul className={styles.navigation}>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="Summary"
        >
          Summary
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="Active-Bets"
        >
          Active-Bets
        </NavLink>
      </li>
    </ul>
  );
};

export default ProfileNavigation;
