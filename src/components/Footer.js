import { Link, NavLink } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../assets/logo_white.png";

const Footer = () => {
  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className={styles.footer}>
      <div>
        <Link to="/">
          <img src={logo} alt="huatah-logo" className={styles.logo} />
        </Link>
        <div>
          &copy; 2024 Huat Ah. <span>All rights reserved.</span>
        </div>
      </div>

      <ul className={styles.navigation} onClick={clickHandler}>
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
            CS
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
    </footer>
  );
};

export default Footer;
