import React, { useState, useContext } from "react";
import "./ProfileMenu.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { usePersonContext } from "../Services/PersonContext";

const ProfileMenu = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const menuToggle = () => {
    setIsMenuActive((prev) => !prev);
  };

  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const { userInfo } = usePersonContext();

  console.log("by user info:", userInfo);
  if (userInfo) {
    console.log(userInfo.fullname); 
  }

  const handleLogout = () => {
    logout(); 
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
          <span>{userInfo ? userInfo.role : "Website Designer"}</span>
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
