import React from "react";
import { X } from "lucide-react";

const Label = ({ children }) => (
  <p className="text-xs uppercase tracking-wide text-gray-400">{children}</p>
);

const Value = ({ children }) => (
  <p className="text-sm text-gray-200 mt-1">{children}</p>
);

const Section = ({ title, children }) => (
  <div className="border border-gray-700 rounded-lg p-4 space-y-2">
    <h4 className="text-sm font-semibold text-purple-400">{title}</h4>
    {children}
  </div>
);

const StatusBadge = ({ status }) => {
  const color =
    status === "accepted"
      ? "bg-green-600/20 text-green-400"
      : status === "shortlisted"
        ? "bg-blue-600/20 text-blue-400"
        : "bg-yellow-600/20 text-yellow-400";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
};

const AdminDetailModal = ({ title, data, onClose }) => {
  if (!data) return null;

  const isApplication = !!data.userId && !!data.jobId;
  console.log(data);


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-gray-900 w-full max-w-2xl rounded-xl p-6 border border-gray-700 relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h3 className="text-xl font-bold text-white">{title}</h3>

        {/* APPLICATION VIEW */}
        {isApplication && (
          <>
            {/* Job Info */}
            <Section title="Job Information">
              <Label>Job Title</Label>
              <Value>{data.jobId.jobTitle}</Value>

              <Label>Recruiter</Label>
              <Value>{data.jobId.recruiterId?.username}</Value>

              <Label>Recruiter Email</Label>
              <Value>{data.jobId.recruiterId?.email}</Value>
            </Section>

            {/* Candidate Info */}
            <Section title="Candidate Information">
              <Label>Name</Label>
              <Value>{data.userId.username}</Value>

              <Label>Email</Label>
              <Value>{data.userId.email}</Value>

              {data.userId.skills?.length > 0 && (
                <>
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {data.userId.skills.map(skill => (
                      <span
                        key={skill}
                        className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </Section>

            {/* Application Status */}
            <Section title="Application Status">
              <Label>Status</Label>
              <StatusBadge status={data.status} />

              <Label className="mt-3">AI Score</Label>
              <Value>{data.aiScore ?? "N/A"}</Value>
            </Section>

            {/* Meta */}
            <Section title="Meta Information">
              <Label>Applied On</Label>
              <Value>{new Date(data.createdAt).toLocaleString()}</Value>

              <Label>Last Updated</Label>
              <Value>{new Date(data.updatedAt).toLocaleString()}</Value>
            </Section>
          </>
        )}

        {/* JOB VIEW */}
        {!isApplication && (
          <>
            <Section title="Job Details">
              <Label>Job Title</Label>
              <Value>{data.jobTitle}</Value>

              <Label>Location</Label>
              <Value>{data.location}</Value>

              <Label>Salary</Label>
              <Value>{data.salary}</Value>

              <Label>Recruiter</Label>
              <Value>{data.recruiterId?.username || "N/A"}</Value>

              <Label>Recruiter Email</Label>
              <Value>{data.recruiterId?.email || "N/A"}</Value>
            </Section>

            {data.skills?.length > 0 && (
              <Section title="Required Skills">
                <div className="flex flex-wrap gap-2">
                  {data.skills.map(skill => (
                    <span
                      key={skill}
                      className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Section>
            )}

            <Section title="Meta Information">
              <Label>Created On</Label>
              <Value>{new Date(data.createdAt).toLocaleString()}</Value>
            </Section>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDetailModal;
