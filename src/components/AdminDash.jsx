import React, { useState } from "react";
import RegisterCompany from "./RegisterCompany";
import "./AdminDash.css";

const AdminDash = () => {
  const [showModal, setShowModal] = useState(false); 

  const handleOpenModal = () => {
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  return (
    <div className="admin-dash">
      <button onClick={handleOpenModal} className="btn btn-primary">
        Register Company
      </button>

      <RegisterCompany isOpen={showModal} onClose={handleCloseModal} />
    </div>
  );
};

export default AdminDash;
