import React, { useState } from "react";
import axios from "axios";
import "./ProfileModal.css";

const ProfileModal = ({ isOpen, onClose }) => {
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [resumeName, setResumeName] = useState(""); // To display the uploaded resume name
  const [profilePhotoName, setProfilePhotoName] = useState(""); // To display the uploaded photo name

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setResumeName(file ? file.name : ""); // Set the file name
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    setProfilePhotoName(file ? file.name : ""); // Set the file name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Bio", bio);
    formData.append("Skills", skills);
    formData.append("Resume", resume);
    formData.append("ProfilePhoto", profilePhoto);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post("https://localhost:7060/api/Profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile submitted successfully!");
      onClose(); 
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("Failed to submit profile. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Submit Profile</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="modal-input-group">
            <label htmlFor="bio" className="modal-label">Bio:</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="modal-textarea"
              required
            />
          </div>
          <div className="modal-input-group">
            <label htmlFor="skills" className="modal-label">Skills:</label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="modal-input"
              required
            />
          </div>
          <div className="modal-input-group">
            <label htmlFor="resume" className="modal-label">Resume (PDF):</label>
            <input
              type="file"
              id="resume"
              accept=".pdf"
              onChange={handleResumeChange}
              className="modal-input-file"
              required
            />
            {resumeName && <p className="file-name">Uploaded: {resumeName}</p>}
          </div>
          <div className="modal-input-group">
            <label htmlFor="profilePhoto" className="modal-label">Profile Photo (JPG):</label>
            <input
              type="file"
              id="profilePhoto"
              accept=".jpg,.jpeg"
              onChange={handleProfilePhotoChange}
              className="modal-input-file"
              required
            />
            {profilePhotoName && <p className="file-name">Uploaded: {profilePhotoName}</p>}
          </div>
          <div className="modal-button-group">
            <button type="submit" className="modal-button submit-button">Submit</button>
            <button type="button" onClick={onClose} className="modal-button cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
