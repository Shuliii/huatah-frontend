import logo from "../assets/logo_red.png";

const Header = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="huatah-logo" />
      </div>
      <div>
        <ul>
          <li>Dota2</li>
          <li>Counter-strike</li>
          <li>Valorant</li>
          <li>Soccer</li>
          <li>NBA</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
