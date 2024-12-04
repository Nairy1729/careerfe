import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./ForgotPassword.css";

const ForgotPassword = ({ isModalOpen, setIsModalOpen }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://localhost:7060/api/Account/forgot-password",
        { email }
      );

      if (response.status === 200) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Error: Unable to send the password reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <h2>Forgot Password</h2>
      <p>Enter your email address to receive a password reset link.</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="modal-input"
      />
      <div className="modal-buttons">
        <button
          onClick={handleForgotPassword}
          disabled={loading}
          className="modal-btn submit-btn"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="modal-btn close-btn"
        >
          Close
        </button>
      </div>
      {message && (
        <p className={`modal-message ${message.startsWith("Error") ? "error" : "success"}`}>
          {message}
        </p>
      )}
    </Modal>
  );
};

export default ForgotPassword;
