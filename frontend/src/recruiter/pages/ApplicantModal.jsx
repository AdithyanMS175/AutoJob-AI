const ApplicantModal = ({ applicant, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-xl w-full max-w-lg p-6">
        <h3 className="text-xl text-white font-bold">
          {applicant.name}
        </h3>

        <p className="text-slate-400 mt-2">
          Email: {applicant.email}
        </p>

        <p className="mt-4 text-slate-300">
          Skills:
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {applicant.skills.map(skill => (
            <span
              key={skill}
              className="bg-purple-700/30 text-purple-300 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

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



