import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateJob = ({ job, onUpdate, onClose }) => {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [salary, setSalary] = useState(job.salary);
  const [requirements, setRequirements] = useState(job.requirementsString);

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication required. Please log in.");
        window.location.href = "/login";
        return;
      }

      const updatedJob = {
        title,
        description,
        salary: parseInt(salary, 10),
        createdAt: job.createdAt, // Include the original creation date
        companyId: job.companyId,
        createdById: job.createdById,
        requirements: requirements.split(",").map((req) => req.trim()), // Convert comma-separated string to array
        requirementsString: requirements,
      };

      const response = await axios.patch(
        `https://localhost:7060/api/JobPost/updateJob/${job.id}`,
        updatedJob,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Job updated successfully!");
        onUpdate(response.data); // Notify the parent component of the updated job
        onClose(); // Close the update form
      }
    } catch (err) {
      console.error("Failed to update job:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to update the job.");
    }
  };

  return (
    <div className="update-job">
      <h2>Update Job</h2>
      <form onSubmit={handleUpdateJob}>
        <div className="form-group">
          <label htmlFor="title">Job Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Job Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="requirements">Requirements (comma-separated):</label>
          <input
            type="text"
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Job
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
