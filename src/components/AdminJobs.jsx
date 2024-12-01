import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateJob from "./UpdateJob";
import DeleteJob from "./DeleteJob"; // Import the DeleteJob component

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null); // To hold the job being updated

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
          "https://localhost:7060/api/JobPost/adminJobs",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(response.data.jobs)) {
          setJobs(response.data.jobs);
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

  const handleUpdate = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  const handleDelete = (deletedJobId) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== deletedJobId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-jobs">
      <h2>Jobs Posted by You</h2>
      <div className="jobs-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>Salary: ₹{job.salary}</p>
            <p>Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
            <p>Requirements: {job.requirementsString}</p>
            <button
              className="btn btn-update"
              onClick={() => setSelectedJob(job)}
            >
              Update
            </button>
            <DeleteJob jobId={job.id} onDelete={handleDelete} /> {/* Add Delete button */}
          </div>
        ))}
      </div>

      {selectedJob && (
        <UpdateJob
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default AdminJobs;
