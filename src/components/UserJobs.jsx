import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./UserJobs.css";
import SearchJobs from "./SearchJobs";

const UserJobs = () => {
  const [jobs, setJobs] = useState([]); 
  const [allJobs, setAllJobs] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Authentication required. Please log in.");
          window.location.href = "/login";
          return;
        }

        const response = await axios.get(
          "https://localhost:7060/api/JobPost/getAllJobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(response.data.jobs)) {
          setJobs(response.data.jobs); 
          setAllJobs(response.data.jobs); 
        } else {
          setError("Unexpected API response format.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserJobs();
  }, []); 

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://localhost:7060/api/Jobs/${jobId}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Successfully applied for the job!");
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to apply for the job.";
      toast.error(errorMessage);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="user-jobs">

        <h2>Jobs For You</h2>
      <div style={{marginBottom:"2rem"}}><SearchJobs setJobs={setJobs} allJobs={allJobs} /></div>

        <div className="jobs-list">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <p>Salary: ₹{job.salary}</p>
                <p>Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
                <p>Requirements: {job.requirementsString}</p>
                <button
                  className="btn apply-btn"
                  onClick={() => handleApply(job.id)}
                >
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserJobs;
