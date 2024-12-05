import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./SearchJobs.css";

const SearchJobs = ({ setJobs, allJobs }) => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery) {
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

      const response = await axios.get(
        `https://localhost:7060/api/Jobs/search?query=${searchQuery}`,
        config
      );

      if (response.data && response.data.jobs) {
        setJobs(response.data.jobs); 
      } else {
        setJobs([]); 
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
