import React from "react";
import UserJobs from "./UserJobs";
import './UserDash.css';

const UserDash = () => {
  return (
    <>
      <h1>Welcome to User Dashboard</h1>
      <div>
        <UserJobs />
      </div>
    </>
  );
};

export default UserDash;
