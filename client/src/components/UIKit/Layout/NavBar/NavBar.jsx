import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = ({ isLobby, setUserData }) => {
  const handleLogout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-Token", "");
  };

  return (
    <div className="navbar-continer">
      <section className="navbar-title">
        <h2>Lets-Talk-Chess</h2>
      </section>
      <section className="navbar-links">
        {!isLobby && (
          <Link to="/lobby" className="navbar-link-lobby">
            <i className="fas fa-concierge-bell"></i>
            Back to lobby
          </Link>
        )}
        <div className="navbar-link-absolute">
          <Link to="/how" className="navbar-link-about">
            <i className="fas fa-book-open"></i>
            How to play
          </Link>
          <Link to="/" className="navbar-link-logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NavBar;
