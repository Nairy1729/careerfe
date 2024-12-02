import React, { useEffect, useState } from "react";
import { getCompany } from "../Services/CompanyService"; 
import axios from "axios";
import "./CompanyList.css";
import { toast } from "react-toastify";
import AdminJobs from "./AdminJobs";
import { useNavigate } from "react-router-dom"; 
import Modal from "react-modal"; // Import react-modal
import EditCompany  from "./EditCompany";



const CompanyList = () => {
  const [latestCompany, setLatestCompany] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [showJobForm, setShowJobForm] = useState(false); 
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    salary: "",
    requirements: "",
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const handleEdit = (companyId) => {
    setSelectedCompanyId(companyId); // Set the selected company ID
    setShowEditModal(true); // Open the edit modal
  };
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  // Fetch company data when the component mounts
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompany();
        if (Array.isArray(data)) {
          const sortedCompanies = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLatestCompany(sortedCompanies[0]);
        } else if (data.companies && Array.isArray(data.companies)) {
          const sortedCompanies = data.companies.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLatestCompany(sortedCompanies[0]);
        } else {
          console.error("Invalid data structure:", data);
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleJobChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const tokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      return Date.now() >= payload.exp * 1000; 
    } catch (error) {
      console.error("Invalid token format:", error);
      return true;
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token || tokenExpired(token)) {
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login"; 
        return;
      }

      const jobPayload = {
        id: 0, 
        title: jobDetails.title,
        description: jobDetails.description,
        salary: parseFloat(jobDetails.salary),
        createdAt: new Date().toISOString(),
        companyId: latestCompany.id,
        createdById: "some-user-id",
        requirements: jobDetails.requirements.split(","),
        requirementsString: jobDetails.requirements,
      };

      await axios.post("https://localhost:7060/api/JobPost/postJob", jobPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job posted successfully!");
      setShowJobForm(false); 
    } catch (err) {
      console.error("Job posting failed:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
        window.location.href = "/login"; 
      } else {
        setError(err.response?.data?.message || "Failed to post the job.");
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!latestCompany) {
    return <p>No companies found.</p>;
  }

  return (
    <div className="company-list">
      <div className="company-card">
        <h2>{latestCompany.name}</h2>
        <img
          src="https://bcassetcdn.com/public/blog/wp-content/uploads/2022/09/01203355/blue-building-circle-by-simplepixelsl-brandcrowd.png"
          alt="Company Logo"
        />
        <p>{latestCompany.description}</p>
        <p>
          Website:{" "}
          <a
            href={latestCompany.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {latestCompany.website}
          </a>
        </p>
        <p>Location: {latestCompany.location}</p>
        <button onClick={() => handleEdit(latestCompany.id)}>
          Edit Company
        </button>

        <button onClick={() => setShowJobForm(true)}>Post Job</button>
      </div>
      <div><AdminJobs /></div>

      {/* Modal for Job Posting */}
      <Modal
        isOpen={showJobForm}
        onRequestClose={() => setShowJobForm(false)}
        contentLabel="Post Job"
        ariaHideApp={false} // To prevent issues with React Modal in some environments
        className="modal" // You can style the modal with your own CSS
        overlayClassName="modal-overlay" // Style the overlay if needed
      >
        <form onSubmit={handlePostJob} className="job-form">
          <div>
            <label>Job Title:</label>
            <input
              type="text"
              name="title"
              value={jobDetails.title}
              onChange={handleJobChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={jobDetails.description}
              onChange={handleJobChange}
              required
            />
          </div>
          <div>
            <label>Salary:</label>
            <input
              type="number"
              name="salary"
              value={jobDetails.salary}
              onChange={handleJobChange}
              required
            />
          </div>
          <div>
            <label>Requirements (comma-separated):</label>
            <input
              type="text"
              name="requirements"
              value={jobDetails.requirements}
              onChange={handleJobChange}
              required
            />
          </div>
          <button type="submit">Post Job</button>
          <button type="button" onClick={() => setShowJobForm(false)}>
            Cancel
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        contentLabel="Edit Company"
        ariaHideApp={false}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <EditCompany
          companyId={selectedCompanyId}
          onClose={() => setShowEditModal(false)} // Close modal handler
        />
      </Modal>
    </div>
  );
};

export default CompanyList;
