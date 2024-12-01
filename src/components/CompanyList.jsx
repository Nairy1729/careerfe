import React, { useEffect, useState } from "react";
import { getCompany, getJob, updateJob } from "../Services/CompanyService"; // Assuming you have an updateJob API service
import axios from "axios";
import "./CompanyList.css";
import { toast } from "react-toastify";
import AdminJobs from "./AdminJobs";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams for navigation and job ID

const handleEdit = (companyId, navigate) => {
  navigate(`/edit-company/${companyId}`);
};

const handleEditJob = (jobId, navigate) => {
  navigate(`/edit-job/${jobId}`); // Navigate to the job edit page with the job ID
};

const CompanyList = () => {
  const [latestCompany, setLatestCompany] = useState(null); // State for the latest company
  const [loading, setLoading] = useState(true); // Loading state
  const [showJobForm, setShowJobForm] = useState(false); // State to toggle job form visibility
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    salary: "",
    requirements: "",
  }); // State for job details
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const { jobId } = useParams(); // Get the jobId from URL params (used in Edit job page)

  // Fetch company data when the component mounts
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompany();
        console.log(data); // Log the response to inspect it
        if (Array.isArray(data)) {
          const sortedCompanies = data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setLatestCompany(sortedCompanies[0]); // Set the latest company
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
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchCompany();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Fetch job details for editing
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (jobId) {
        try {
          const response = await axios.get(`https://localhost:7060/api/JobPost/${jobId}`);
          setJobDetails(response.data);
        } catch (error) {
          console.error("Failed to fetch job details:", error);
        }
      }
    };

    fetchJobDetails();
  }, [jobId]); // Re-run this effect if jobId changes

  const handleJobChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const tokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // Decode token payload
      return Date.now() >= payload.exp * 1000; // Check expiry
    } catch (error) {
      console.error("Invalid token format:", error);
      return true; // Assume expired if token format is invalid
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Debug token

      if (!token || tokenExpired(token)) {
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login"; // Redirect to login
        return;
      }

      const jobPayload = {
        id: 0, // Assuming the backend generates the ID
        title: jobDetails.title,
        description: jobDetails.description,
        salary: parseFloat(jobDetails.salary),
        createdAt: new Date().toISOString(),
        companyId: latestCompany.id, // Use the latest company's ID
        createdById: "some-user-id", // Replace with the authenticated user's ID
        requirements: jobDetails.requirements.split(","), // Split into an array
        requirementsString: jobDetails.requirements, // For API compatibility
      };

      await axios.post("https://localhost:7060/api/JobPost/postJob", jobPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token from localStorage
        },
      });

      toast.success("Job posted successfully!");
      setShowJobForm(false); // Hide the form after successful submission
    } catch (err) {
      console.error("Job posting failed:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
        window.location.href = "/login"; // Redirect to login
      } else {
        setError(err.response?.data?.message || "Failed to post the job.");
      }
    }
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token || tokenExpired(token)) {
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login"; // Redirect to login
        return;
      }

      const jobPayload = {
        title: jobDetails.title,
        description: jobDetails.description,
        salary: parseFloat(jobDetails.salary),
        requirements: jobDetails.requirements.split(","),
        requirementsString: jobDetails.requirements,
      };

      await axios.put(`https://localhost:7060/api/JobPost/updateJob/${jobId}`, jobPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Job updated successfully!");
      navigate("/admin-dashboard"); // Redirect after successful job update
    } catch (err) {
      console.error("Job update failed:", err.response?.data || err.message);
      if (err.response?.status === 401) {
        toast.error("Authentication failed. Please log in again.");
        window.location.href = "/login"; // Redirect to login
      } else {
        setError(err.response?.data?.message || "Failed to update the job.");
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
        <button onClick={() => handleEdit(latestCompany.id, navigate)}>Edit Company</button>
        <button onClick={() => setShowJobForm(!showJobForm)}>
          {showJobForm ? "Cancel Job Posting" : "Post Job"}
        </button>
      </div>
      <div><AdminJobs /></div>

      {showJobForm && (
        <form onSubmit={jobId ? handleUpdateJob : handlePostJob} className="job-form">
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
          <button type="submit">{jobId ? "Update Job" : "Post Job"}</button>
        </form>
      )}
    </div>
  );
};

export default CompanyList;
