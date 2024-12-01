import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteJob = ({ jobId, onDelete }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication required. Please log in.");
        window.location.href = "/login";
        return;
      }

      const response = await axios.delete(
        `https://localhost:7060/api/JobPost/deleteJob/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Job deleted successfully!");
        onDelete(jobId); // Notify the parent component to update the UI
      }
    } catch (err) {
      console.error("Failed to delete job:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to delete the job.");
    }
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteJob;
