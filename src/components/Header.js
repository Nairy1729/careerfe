import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";
import ProfileMenu from "./ProfileMenu"; 
import './Header.css'; 

const Header = () => {
  const { auth } = useContext(AuthContext);
  const role = localStorage.getItem("role");



  return (
    <header>
      <div className="logo">
        
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Career Crafter Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/aboutUs">AboutUs</Link>
          </li>
          <li>
            <Link to="/contactUs">ContactUs</Link>
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
      {role === "Admin" ? (
        <li>
          <Link to="/company">Employer Section</Link>
        </li>
      ) : (
        <li>
          <Link to="/userDash">JobSeeker Section</Link>
        </li>
      )}
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
