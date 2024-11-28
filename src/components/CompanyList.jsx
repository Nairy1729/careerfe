import React, { useEffect, useState } from "react";
import { getCompany } from "../Services/CompanyService";
import "./CompanyList.css";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]); // Renamed state to companies for clarity
  const [loading, setLoading] = useState(true); // Add a loading state

  // Fetch company data when the component mounts
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await getCompany();
        console.log(data); // Log the response to inspect it
        // Assuming data is an array of companies, if it's an object, update accordingly
        if (Array.isArray(data)) {
          setCompanies(data);
        } else if (data.companies && Array.isArray(data.companies)) {
          setCompanies(data.companies); // Access the companies key if necessary
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

  if (loading) {
    return <p>Loading...</p>; // Display loading text until the data is fetched
  }

  return (
    <div className="company-list">
      {companies.length === 0 ? (
        <p>No companies found.</p> // Display message if no companies are found
      ) : (
        companies.map((comp) => (
          <div className="company-card" key={comp.id}>
            <h2>{comp.name}</h2>
            <img src="https://bcassetcdn.com/public/blog/wp-content/uploads/2022/09/01203355/blue-building-circle-by-simplepixelsl-brandcrowd.png"  /> {/* Corrected alt text */}
            <p>{comp.description}</p>
            <p>Website: <a href={comp.website} target="_blank" rel="noopener noreferrer">{comp.website}</a></p>
            <p>Location: {comp.location}</p>
            {/* <p>Created At: {new Date(comp.createdAt).toLocaleString()}</p>
            <p>Updated At: {new Date(comp.updatedAt).toLocaleString()}</p> */}
            <button>View Details</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CompanyList;
