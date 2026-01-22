import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getMyApplicationsAPI } from "../../services/allAPI";
import Header from "../components/Header";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  //  Fetch applications
  const fetchMyApplications = async () => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    if (!token || !storedUser) return;

    const user = JSON.parse(storedUser);

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const reqBody = {
      userId: user._id,
    };

    try {
      const result = await getMyApplicationsAPI(reqBody, reqHeader);
      if (result.status === 200) {
        setApplications(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch applications", err);
    }
  };

    console.log(applications)

  //  GSAP animations
  useEffect(() => {
    if (applications.length > 0) {
      gsap.from(containerRef.current, {
        opacity: 50,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(cardRefs.current, {
        opacity: 100,
        y: 30,
        stagger: 0.12,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2,
      });
    }
  }, [applications]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 px-6 py-10">
        <Header/>

      <div className="max-w-6xl mx-auto mt-20 space-y-8" ref={containerRef}>
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            My Applications
          </h1>
          <p className="text-gray-400">
            Track the status of jobs you’ve applied for
          </p>
        </div>

        {/* Empty State */}
        {applications.length === 0 ? (
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-10 text-center">
            <p className="text-gray-400 text-lg">
              You haven’t applied to any jobs yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((app, index) => (
              <div
                key={app._id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 hover:bg-white/5 transition-all duration-300"
              >
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {app.jobId?.jobTitle || "Job Title"}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {app.recruiterId?.name || "Recruiter"}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      app.status === "applied"
                        ? "bg-blue-600/20 text-blue-400"
                        : app.status === "shortlisted"
                        ? "bg-green-600/20 text-green-400"
                        : "bg-red-600/20 text-red-400"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <p className="text-white text-sm">AI Score</p>
                    <p className="text-white font-medium">
                      {app.aiScore || 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-white text-sm">Applied On</p>
                    <p className="text-white font-medium">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="hidden md:block">
                    <p className="text-white text-sm">Resume</p>
                    <p className="text-purple-400 font-medium">
                      Submitted
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
