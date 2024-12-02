import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./JobApplicants.css"

const JobApplicants = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]); // Store applicants list
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch applicants when the component mounts
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
  }, [jobId]); // Dependency on jobId to re-fetch if jobId changes

  // If loading, show loading message
  if (loading) return <p>Loading applicants...</p>;
  
  // If error, show error message
  if (error) return <p>{error}</p>;

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
              <p>Status: {applicant.status === 0 ? "Pending" : "Accepted"}</p>
              <p>Applied on: {new Date(applicant.createdAt).toLocaleDateString()}</p>
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
