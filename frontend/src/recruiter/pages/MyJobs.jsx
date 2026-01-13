import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { getMyJobsAPI } from "../../services/allAPI";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    const user = JSON.parse(storedUser);
    const id = user._id

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const reqBody = {
      recruiterId: id,
    };

    const result = await getMyJobsAPI(reqBody, reqHeader);

    if (result.status === 200) {
      setJobs(result.data);
      setUserId(user._id)

    }
    
    
    
    
  };

  console.log(jobs);
  console.log(userId);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My Job Posts</h2>

      {jobs.length === 0 ? (
        <p className="text-slate-400">No jobs posted yet.</p>
      ) : (
        jobs.map(job => <JobCard key={job._id} job={job} />)
      )}
    </div>
  );
};

export default MyJobs;