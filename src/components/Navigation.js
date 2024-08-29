import { NavLink } from "react-router-dom";

import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <ul className={styles.navigation}>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/bet/Soccer"
        >
          Soccer
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/bet/NBA"
        >
          NBA
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/bet/Dota2"
        >
          Dota2
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/bet/CS"
        >
          CS
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          to="/bet/Valorant"
        >
          Valorant
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
