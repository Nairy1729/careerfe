import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./EditCompany.css"; 

const EditCompany = ({ companyId, onClose }) => {
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logoUrl: "",
    personId: "12345",
    createdAt: "2024-12-02T16:42:13.104Z",
    updatedAt: "2024-12-02T16:42:13.104Z",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7060/api/Company/${companyId}`
        );
        // setCompanyDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch company details:", err);
        setError("Failed to fetch company details.");
      }
    };

    if (companyId) fetchCompany();
  }, [companyId]);

  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://localhost:7060/api/Company/${companyId}`,
        companyDetails
      );
      toast.success("Company updated successfully!");
      onClose(); 
    } catch (err) {
      console.error("Failed to update company:", err);
      setError("Failed to update company.");
    }
  };

  return (
    <div className="edit-company-container">
      <h2 className="edit-company-title">Edit Company</h2>
      {error && <p className="edit-company-error">{error}</p>}
      <form className="edit-company-form" onSubmit={handleUpdateCompany}>
        <div className="form-group">
          <label className="form-label">Company Name:</label>
          <input
            type="text"
            name="name"
            value={companyDetails.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            value={companyDetails.description}
            onChange={handleChange}
            className="form-input form-textarea"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Website:</label>
          <input
            type="text"
            name="website"
            value={companyDetails.website}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Location:</label>
          <input
            type="text"
            name="location"
            value={companyDetails.location}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Logo URL:</label>
          <input
            type="text"
            name="logoUrl"
            value={companyDetails.logoUrl}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-buttons" style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', margin: '20px 0' }}>
  <button
    type="submit"
    style={{
      flex: 1,
      padding: '10px',
      textAlign: 'center',
      height: '2.5rem',
      backgroundColor: 'blue',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkblue')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = 'blue')}
  >
    Update
  </button>
  <button
    type="button"
    onClick={onClose}
    style={{
      flex: 1,
      padding: '10px',
      textAlign: 'center',
      height: '2.5rem',
      backgroundColor: '#0056B3',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = 'darkgrey')}
    onMouseLeave={(e) => (e.target.style.backgroundColor = 'grey')}
  >
    Cancel
  </button>
</div>

</div>


      </form>
    </div>
  );
};

export default EditCompany;
