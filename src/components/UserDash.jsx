import React, { useState } from "react";
import UserJobs from "./UserJobs";
import AppliedJobs from "./AppliedJobs";
import './UserDash.css';

const UserDash = () => {
  const [showUserJobs, setShowUserJobs] = useState(false);
  const [showAppliedJobs, setShowAppliedJobs] = useState(false);

  const handleUserJobsClick = () => {
    setShowUserJobs(true);
    setShowAppliedJobs(false);
  };

  const handleAppliedJobsClick = () => {
    setShowAppliedJobs(true);
    setShowUserJobs(false);
  };

  return (
    <div className="user-dash">
      <h1 className="user-dash__title">Welcome to User Dashboard</h1>
      <div className="user-dash__buttons">
        <button className="user-dash__button user-dash__button--jobs" onClick={handleUserJobsClick}>
          Show User Jobs
        </button>
        <button className="user-dash__button user-dash__button--applied" onClick={handleAppliedJobsClick}>
          Show Applied Jobs
        </button>
      </div>
      <div className="user-dash__content">
        {showUserJobs && <UserJobs />}
        {showAppliedJobs && <AppliedJobs />}
      </div>
    </div>
  );
};

export default UserDash;
