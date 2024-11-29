import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import ProfileMenu from "./ProfileMenu"; // Import your ProfileMenu component
import './Header.css'; // Import the new Header.css

const Header = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Calls logout function from AuthContext
    navigate("/login"); // Redirects user to login page after logout
  };

  return (
    <header>
      <div className="logo">
        {/* Logo image */}
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Career Crafter Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {!auth ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/company">Company</Link>
              </li>
              <div>
                <ProfileMenu /> {/* Render the ProfileMenu component here */}
              </div>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
