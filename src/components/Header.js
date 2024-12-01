import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";
import ProfileMenu from "./ProfileMenu"; // Import your ProfileMenu component
import './Header.css'; // Import the new Header.css

const Header = () => {
  const { auth } = useContext(AuthContext);



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
                <ProfileMenu /> 
              </div>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
