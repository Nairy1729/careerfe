import React, { useState, useContext } from "react";
import "./ProfileMenu.css";
import { useNavigate } from "react-router-dom";
import { usePersonContext } from "../Services/PersonContext";
import AuthContext from "../AuthContext";

const ProfileMenu = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { userInfo, setUserInfo } = usePersonContext();
  const { logout } = useContext(AuthContext); // Access logout from AuthContext
  const navigate = useNavigate();

  const menuToggle = () => {
    setIsMenuActive((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear user-related data from localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
  
    // Clear context state
    setUserInfo(null);
    logout(); // Call the logout function to clear auth state
  
    // Redirect to the login page
    navigate("/login");
  };
  

  return (
    <div className="action">
      <div className="profile" onClick={menuToggle}>
        <img src="profile.png" alt="Profile Avatar" />
      </div>
      <div className={`menu ${isMenuActive ? "active" : ""}`}>
        <h3>
          {userInfo ? userInfo.fullname : "Someone"}
          <br />
          <span>
  {userInfo ? (userInfo.role === "Admin" ? "Employer" : "JobSeeker") : "Website Designer"}
</span>

        </h3>
        <ul>
          <li>
            <img src="./assets/icons/user.png" alt="User Icon" />
            <a href="#">My profile</a>
          </li>
          <li>
            <img src="./assets/icons/edit.png" alt="Edit Icon" />
            <a href="#">Edit profile</a>
          </li>
          <li>
            <img src="./assets/icons/log-out.png" alt="Logout Icon" />
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
