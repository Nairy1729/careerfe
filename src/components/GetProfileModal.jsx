import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GetProfileModal.css";

const GetProfileModal = ({ isOpen, onClose }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("https://localhost:7060/api/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
      });

      setProfileData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to fetch profile. Please try again.");
      setLoading(false);
    }
  };

  const handleResumeDownload = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("https://localhost:7060/api/Profile/DownloadResume", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf",
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf"); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Failed to download resume. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">User Profile</h2>
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : profileData ? (
          <div className="modal-content">
            <div className="modal-input-group">
              <label className="modal-label">Bio:</label>
              <p className="modal-data">{profileData.bio}</p>
            </div>
            <div className="modal-input-group">
              <label className="modal-label">Skills:</label>
              <p className="modal-data">{profileData.skills}</p>
            </div>
            <div className="modal-input-group">
              <button
                className="modal-button download-button"
                onClick={handleResumeDownload}
              >
                Download Resume
              </button>
            </div>
          </div>
        ) : (
          <p className="error-text">No profile data available.</p>
        )}
        <div className="modal-button-group">
          <button onClick={onClose} className="modal-button close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetProfileModal;
