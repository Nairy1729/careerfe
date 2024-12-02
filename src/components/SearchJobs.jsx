import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchJobs = ({ setJobs, allJobs }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Handle search function
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery) {
      // If search query is empty, show all jobs
      setJobs(allJobs);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No authorization token found");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // API request for job search
      const response = await axios.get(
        `https://localhost:7060/api/Jobs/search?query=${searchQuery}`,
        config
      );

      if (response.data && response.data.jobs) {
        setJobs(response.data.jobs); // Update parent state with the jobs
      } else {
        setJobs([]); // No jobs found
      }
    } catch (err) {
      setError("Failed to search jobs");
      toast.error("Error occurred while searching for jobs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-jobs-container">
      <h1>Search Jobs</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchJobs;
