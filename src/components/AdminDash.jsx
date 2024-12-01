import React, { useState } from "react";
import RegisterCompany from "./RegisterCompany";
import "./AdminDash.css";

const AdminDash = () => {
  const [showRegisterCompany, setShowRegisterCompany] = useState(false); // State to toggle the registration form

  const handleRegisterCompany = () => {
    setShowRegisterCompany(true); // Show the RegisterCompany component
  };

  const handleGoBack = () => {
    setShowRegisterCompany(false); // Hide the RegisterCompany component and return to dashboard
  };

  return (
    <div className="admin-dash">
      {!showRegisterCompany ? (
        <>
          <h1>Welcome to Admin Dashboard</h1>
          <button onClick={handleRegisterCompany} className="btn btn-primary">
            Register Company
          </button>
        </>
      ) : (
        <div className="register-company-container">
          <button onClick={handleGoBack} className="btn btn-secondary">
            Back to Dashboard
          </button>
          <RegisterCompany />
        </div>
      )}
    </div>
  );
};

export default AdminDash;
