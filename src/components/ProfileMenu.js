import React, { useState, useContext , useEffect } from "react";
import "./ProfileMenu.css";
import { useNavigate } from "react-router-dom";
import { usePersonContext } from "../Services/PersonContext";
import AuthContext from "../AuthContext";
import ProfileModal from "./ProfileModal"; // Import the ProfileModal component
import GetProfileModal from "./GetProfileModal";
import axios from "axios";

const ProfileMenu = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // Manage modal state
  const { userInfo, setUserInfo } = usePersonContext();
  const { logout } = useContext(AuthContext); // Access logout from AuthContext
  const navigate = useNavigate();
  const [isModalOpen2 , setModalOpen2] = useState(false) ;
  const [profileImage, setProfileImage] = useState("");

  const menuToggle = () => {
    setIsMenuActive((prev) => !prev);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://localhost:7060/api/Profile/DownloadProfilePhoto", {
          responseType: "blob", // Set responseType to "blob" to handle binary data (image)
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        });

        const imageBlob = response.data;
        const imageUrl = URL.createObjectURL(imageBlob); // Create an object URL from the Blob
        setProfileImage(imageUrl); // Set the object URL as the image source
      } catch (error) {
        console.error("Error fetching profile image:", error);
        // alert("Failed to fetch profile image.");
      }
    };

    fetchProfileImage();
  }, []);

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

  const handleMyProfile = () => {
    setModalOpen2(true) ;
  }

  const handleEditProfile = () => {
    setModalOpen(true); // Open the modal when "Edit Profile" is clicked
  };

  return (
    <div className="action">
      <div className="profile" onClick={menuToggle}>
        <img src={profileImage || "Profile.png"} alt="Profile Avatar" />
      </div>
      <div className={`menu ${isMenuActive ? "active" : ""}`}>
        <h3>
          {userInfo ? userInfo.fullname : "Someone"}
          <br />
          <span>
            {userInfo
              ? userInfo.role === "Admin"
                ? "Employer"
                : "JobSeeker"
              : "Website Designer"}
          </span>
        </h3>
        <ul>
          <li>
            <img src="./assets/icons/user.png" alt="User Icon" />
            <a href="#" onClick={handleMyProfile}>My profile</a>
          </li>
          <li>
            <img src="./assets/icons/edit.png" alt="Edit Icon" />
            <a href="#" onClick={handleEditProfile}>
              Edit profile
            </a>
          </li>
          <li>
            <img src="./assets/icons/log-out.png" alt="Logout Icon" />
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
      {/* Render the ProfileModal */}
      {isModalOpen && (
        <ProfileModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)} // Close the modal
        />
      )}
      {isModalOpen2 && (
        <GetProfileModal
          isOpen={isModalOpen2}
          onClose={() => setModalOpen2(false)} // Close the modal
        />
      )}
    </div>
  );
};

export default ProfileMenu;
