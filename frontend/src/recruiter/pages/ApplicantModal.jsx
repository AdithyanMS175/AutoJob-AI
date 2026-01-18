const ApplicantModal = ({ applicant, onClose }) => {
  if (!applicant) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center gap-4">
          <img
            src={`http://localhost:3000/uploads/${applicant.picture}`}
            alt={applicant.username}
            className="w-20 h-20 rounded-full object-cover border border-slate-700"
          />

          <div>
            <h3 className="text-2xl text-white font-bold">
              {applicant.username}
            </h3>
            <p className="text-slate-400">{applicant.email}</p>
            <p className="text-slate-400">{applicant.phone}</p>
          </div>
        </div>

        {/* Bio */}
        {applicant.bio && (
          <div className="mt-4">
            <h4 className="text-white font-semibold">Bio</h4>
            <p className="text-slate-300 mt-1">{applicant.bio}</p>
          </div>
        )}

        {/* Skills */}
        <div className="mt-4">
          <h4 className="text-white font-semibold">Skills</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {applicant.skills?.length ? (
              applicant.skills.map(skill => (
                <span
                  key={skill}
                  className="bg-purple-700/30 text-purple-300 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-slate-400">No skills listed</p>
            )}
          </div>
        </div>

        {/* Experience */}
        {applicant.experience?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-white font-semibold">Experience</h4>
            <ul className="mt-2 space-y-2">
              {applicant.experience.map((exp, idx) => (
                <li
                  key={idx}
                  className="bg-slate-800 p-3 rounded-lg"
                >
                  <p className="text-white font-medium">
                    {exp.role} @ {exp.company}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {exp.years}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education */}
        {applicant.education?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-white font-semibold">Education</h4>
            <ul className="mt-2 space-y-2">
              {applicant.education.map((edu, idx) => (
                <li
                  key={idx}
                  className="bg-slate-800 p-3 rounded-lg"
                >
                  <p className="text-white font-medium">
                    {edu.degree}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {edu.institution} ({edu.year})
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        <div className="mt-4 flex gap-4">
          {applicant.linkedin && (
            <a
              href={`https://${applicant.linkedin}`}
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
          )}
          {applicant.github && (
            <a
              href={`https://${applicant.github}`}
              target="_blank"
              className="text-gray-300 hover:underline"
            >
              GitHub
            </a>
          )}
        </div>

        {/* Resumes */}
        {applicant.resumes?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-white font-semibold">Resumes</h4>
            <ul className="mt-2 space-y-1">
              {applicant.resumes.map((resume, idx) => (
                <li key={idx}>
                  <a
                    href={`http://localhost:3000/uploads/resumes/${resume}`}
                    target="_blank"
                    className="text-purple-400 hover:underline"
                  >
                    View Resume {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 px-4 py-2 rounded-lg text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApplicantModal;
