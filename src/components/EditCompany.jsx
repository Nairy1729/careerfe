import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditCompany = () => {
  const { companyId } = useParams(); // Get the companyId from the URL
  const navigate = useNavigate(); // For redirecting after the edit

  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logoUrl: "",
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7060/api/companies/${companyId}`
        );
        setCompanyDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch company details:", err);
        setError("Failed to fetch company details.");
      }
    };

    fetchCompany();
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
        `https://localhost:7060/api/companies/${companyId}`,
        companyDetails
      );
      toast.success("Company updated successfully!");
      navigate("/"); // Redirect to the main company list after successful edit
    } catch (err) {
      console.error("Failed to update company:", err);
      setError("Failed to update company.");
    }
  };

  return (
    <div>
      <h2>Edit Company</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleUpdateCompany}>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="name"
            value={companyDetails.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={companyDetails.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={companyDetails.website}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={companyDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Logo URL:</label>
          <input
            type="text"
            name="logoUrl"
            value={companyDetails.logoUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Company</button>
      </form>
    </div>
  );
};

export default EditCompany;
