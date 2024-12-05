import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./JobApplicants.css";



const JobApplicants = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication required. Please log in.");
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(
          `https://localhost:7060/api/Jobs/${jobId}/applicants`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success && Array.isArray(response.data.applicants)) {
          setApplicants(response.data.applicants); // Set applicants data
        } else {
          setError("No applicants found for this job.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]); 


  if (loading) return <p>Loading applicants...</p>;

  if (error) return <p>{error}</p>;

  const handleResumeDownload = async (applicantId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(
        `https://localhost:7060/api/Jobs/applicant/${applicantId}/resume`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf",
          },
          responseType: "blob", 
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf"); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Failed to download resume. Please try again.");
    }
  };


  const handleStatusUpdate = async (applicantId, jobId, status, applicantEmail, applicantName) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `https://localhost:7060/api/Jobs/update-status?applicantId=${applicantId}&jobId=${jobId}`,
        `"${status}"`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        }
      );

      if (response.data.success) {
        toast.success("Status updated successfully , and mailed to applicant!");
        setApplicants((prevApplicants) =>
          prevApplicants.map((applicant) =>
            applicant.applicantId === applicantId && applicant.jobId === jobId
              ? { ...applicant, status }
              : applicant
          )
        );
      } else {
        toast.error(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error.response?.data?.message || "Failed to update status. Please try again.");
    }
  };

  return (
    <div className="job-applicants">
      <h2>Applicants for Job ID: {jobId}</h2>
      <div className="applicants-list">
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <div key={applicant.applicationId} className="applicant-card">
              <h3>{applicant.applicantName}</h3>
              <p>Email: {applicant.email}</p>
              <p>Phone: {applicant.phoneNumber}</p>
              <p>Bio: {applicant.bio}</p>
              <p>Skills: {applicant.skills}</p>
              <p>Status: {applicant.status === 0 ? "Pending" : applicant.status === 1 ? "Accepted" : "Rejected"}</p>
              <p>Applied on: {new Date(applicant.createdAt).toLocaleDateString()}</p>
              <button
                className="modal-button download-button"
                onClick={() => handleResumeDownload(applicant.applicantId)}
              >
                Download Resume
              </button>
              <select
                className="status-dropdown"
                onChange={(e) => handleStatusUpdate(applicant.applicantId, jobId, e.target.value, applicant.email, applicant.applicantName)}
                defaultValue={applicant.status}
              >
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          ))
        ) : (
          <p>No applicants found for this job.</p>
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
