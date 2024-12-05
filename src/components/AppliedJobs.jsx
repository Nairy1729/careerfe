import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./AppliedJobs.css"

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authorization token found');
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('https://localhost:7060/api/Jobs/applied-jobs', config);

      if (response.data && response.data.applications) {
        setJobs(response.data.applications);
      } else {
        setError('No jobs found in the response');
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const handleWithdraw = async (jobId) => {
    const confirmation = window.confirm('Are you sure you want to withdraw from this job?');

    if (!confirmation) {
      return; 
    }

    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('No authorization token found');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(`https://localhost:7060/api/Jobs/${jobId}/withdraw`, config);
      
      if (response.status === 200) {
        fetchAppliedJobs();
        toast.success('Job withdrawn successfully!');
      } else {
        toast.error('Failed to withdraw from the job');
      }
    } catch (err) {
      console.error('Error withdrawing job:', err);
      toast.error('Failed to withdraw from the job');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="applied-jobs-container">
      <h1>Applied Jobs</h1>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>Job Title:</strong> {job.jobTitle} <br />
              <strong>Job Description:</strong>{job.jobDescription} <br />
              <string>Salary:</string>{job.jobSalary} <br />
              <strong>Status:</strong> {job.status === 0 ? 'Pending' : 'Accepted'} <br />
              <strong>Applied On:</strong> {new Date(job.createdAt).toLocaleString()} <br />
              <button onClick={() => handleWithdraw(job.jobId)}>Withdraw</button>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs applied yet.</p>
      )}
  
      <ToastContainer />
    </div>
  );
};

export default AppliedJobs;
