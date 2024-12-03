import React, { useState } from "react";
import RegisterCompany from "./RegisterCompany";
import "./AdminDash.css";

const AdminDash = () => {
  const [showModal, setShowModal] = useState(false); // State to toggle the modal

  const handleOpenModal = () => {
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  return (
    <div className="admin-dash">
      {/* <h1>Welcome to Admin Dashboard</h1> */}
      <button onClick={handleOpenModal} className="btn btn-primary">
        Register Company
      </button>

      <RegisterCompany isOpen={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default AdminDash;
