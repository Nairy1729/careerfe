import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./EditCompany.css"; // Import the CSS file

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
        setCompanyDetails(response.data);
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
      onClose(); // Close the modal on success
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
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            Update Company
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompany;
