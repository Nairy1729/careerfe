import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateJob from "./UpdateJob";
import DeleteJob from "./DeleteJob"; 
import JobApplicants from "./JobApplicants"; 
import Modal from "react-modal";
import "./AdminJobs.css" ;

// Set up modal styling
Modal.setAppElement("#root");

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]); // Jobs list
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedJob, setSelectedJob] = useState(null); // Job to update
  const [viewApplicantsJobId, setViewApplicantsJobId] = useState(null); // Job ID to view applicants

  // Fetch jobs posted by the admin
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

  // Handle job update
  const handleUpdate = (updatedJob) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  };

  // Handle job deletion
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
            <div className="button-group">
              <button
                className="btn btn-update"
                onClick={() => setSelectedJob(job)}
              >
                Update
              </button>
              <DeleteJob jobId={job.id} onDelete={handleDelete} />
              <button
                className="btn btn-view-applicants"
                onClick={() => setViewApplicantsJobId(job.id)}
              >
                View Applicants
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* UpdateJob Modal */}
      <Modal
        isOpen={!!selectedJob}
        onRequestClose={() => setSelectedJob(null)}
        contentLabel="Update Job"
        className="modal"
        overlayClassName="overlay"
      >
        {selectedJob && (
          <UpdateJob
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onUpdate={handleUpdate}
          />
        )}
      </Modal>

      {/* JobApplicants Modal */}
      <Modal
        isOpen={!!viewApplicantsJobId}
        onRequestClose={() => setViewApplicantsJobId(null)}
        contentLabel="View Applicants"
        className="modal"
        overlayClassName="overlay"
      >
        {viewApplicantsJobId && (
          <JobApplicants
            jobId={viewApplicantsJobId}
            onClose={() => setViewApplicantsJobId(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminJobs;
