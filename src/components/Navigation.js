import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <ul className={styles.navigation}>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/Soccer"
        >
          Soccer
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/NBA"
        >
          NBA
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/Dota2"
        >
          Dota2
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/CS"
        >
          Counter-strike
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/Valorant"
        >
          Valorant
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
