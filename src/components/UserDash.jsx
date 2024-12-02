import React, { useState } from "react";
import UserJobs from "./UserJobs";
import AppliedJobs from "./AppliedJobs"; // Assuming you have this component already
import './UserDash.css';

const UserDash = () => {
  // States to toggle the visibility of UserJobs and AppliedJobs components
  const [showUserJobs, setShowUserJobs] = useState(false);
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);

  // Function to show UserJobs
  const handleUserJobsClick = () => {
    setShowUserJobs(true);
    setShowAppliedJobs(false);  // Hide Applied Jobs when User Jobs is clicked
  };

  // Function to show AppliedJobs
  const handleAppliedJobsClick = () => {
    setShowAppliedJobs(true);
    setShowUserJobs(false);  // Hide User Jobs when Applied Jobs is clicked
  };

  return (
    <>
      <h1>Welcome to User Dashboard</h1>
      
      {/* Buttons to show each component */}
      <button onClick={handleUserJobsClick}>Show User Jobs</button>
      <button onClick={handleAppliedJobsClick}>Show Applied Jobs</button>
      
      <div>
        {/* Conditionally render the UserJobs or AppliedJobs component based on state */}
        {showUserJobs && <UserJobs />}
        {showAppliedJobs && <AppliedJobs />}
      </div>
    </>
  );
};

export default UserDash;
