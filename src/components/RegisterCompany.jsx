import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./RegisterCompany.css";

const RegisterCompany = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logoUrl: "",
    personId: "12345",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      id: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to register a company.");
        return;
      }

      const response = await axios.post(
        "https://localhost:7060/api/Company/register-company",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Company registered successfully!");
        setFormData({
          name: "",
          description: "",
          website: "",
          location: "",
          logoUrl: "",
          personId: "12345",
        });
        onClose();
      } else {
        toast.error("Failed to register the company. Please try again.");
      }
    } catch (error) {
      console.error("Error registering company:", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Unknown error"}`);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Register a Company</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="logoUrl">Logo URL</label>
            <input
              type="url"
              id="logoUrl"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="modal-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register Company"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterCompany;
